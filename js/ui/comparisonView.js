/**
 * comparisonView.js — updateComparisonView, renderCategoryBars, showArchetypeInfo
 * Extracted from app-main.js v1.8.1031
 *
 * Dependencies (via window.*):
 *   window.tiageData, window.getIchArchetype(), window.getPartnerArchetype()
 *   window.personDimensions, window.ensureValidOrientierung
 *   window.checkPhysicalCompatibility, window.calculatePhilosophyCompatibility (scoringEngine.js)
 *   window.calculateOverallWithModifiers (calculationEngine.js)
 *   window.updateGfkFromArchetypes (gfkMatching.js)
 *   window.updateRFactorDisplay, window.updateDesktopFactorContent, window.updateSelectionInfoMessage
 *   window.updateExpandableCategoryBars (self-exported)
 *   window.drawRadarChart (chartUtils.js)
 *   window.updateSyntheseScoreCycle, window.showArchetypeInfoByType
 *   TiageState, TiageI18n, ResonanceQuotesTable
 *   currentDefinitionIndex, currentDefinitionPerson (globals from categoryModal.js)
 *   handleDefinitionTouchStart, handleDefinitionTouchEnd (globals from categoryModal.js)
 */
(function() {
    'use strict';

    // Throttle für updateComparisonView (max 1x pro 150ms)
    let _updateComparisonViewScheduled = false;
    let _updateComparisonViewPending = false;

    function updateComparisonView() {
        // Performance: Verhindere zu häufige Updates
        if (_updateComparisonViewScheduled) {
            _updateComparisonViewPending = true;
            return;
        }

        _updateComparisonViewScheduled = true;
        setTimeout(function() {
            _updateComparisonViewScheduled = false;
            if (_updateComparisonViewPending) {
                _updateComparisonViewPending = false;
                updateComparisonView();
            }
        }, 150);

        if (!window.tiageData) return;

        // console.log('[TIAGE] updateComparisonView called - dimensions:', JSON.stringify({
        //     ich: window.personDimensions.ich,
        //     partner: window.personDimensions.partner
        // })); // DISABLED: verursacht Message-Overflow

        const ichArch = window.tiageData.archetypes[window.getIchArchetype()];
        const partnerArch = window.tiageData.archetypes[window.getPartnerArchetype()];

        // NEU: GFK-Bedürfnis-Matching mit allen Dimensionen neu berechnen
        try {
            window.updateGfkFromArchetypes();
        } catch (e) {
            console.warn('[TIAGE] updateGfkFromArchetypes error:', e);
        }

        // Update type names
        document.getElementById('resultIchType').textContent = ichArch?.name || window.getIchArchetype();
        document.getElementById('resultPartnerType').textContent = partnerArch?.name || window.getPartnerArchetype();

        // Calculate compatibility
        // SSOT v3.10: Needs aus TiageState laden für R-Faktor-Berechnung
        // FIX v4.3: getFlatNeeds() statt get('flatNeeds.ich') — letzteres gibt verschachteltes
        // Eltern-Objekt { ra: {...}, single: {...} } zurück statt die flachen Bedürfnisse.
        // calculateDimensionalResonance findet dann keine Needs → R=1.0 → überschreibt korrekte Werte!
        const ichNeeds = typeof TiageState !== 'undefined' && TiageState.getFlatNeeds ? TiageState.getFlatNeeds('ich') : null;
        const partnerNeeds = typeof TiageState !== 'undefined' && TiageState.getFlatNeeds ? TiageState.getFlatNeeds('partner') : null;

        // FIX: Konvertiere Orientierung von Array (UI-Format) zu Object (Berechnungs-Format)
        // UI speichert Orientierung als Array ['hetero', 'bi'], Berechnung erwartet {primary, secondary}
        const person1 = {
            archetyp: window.getIchArchetype(),
            ...window.personDimensions.ich,
            orientierung: window.ensureValidOrientierung(window.personDimensions.ich.orientierung),
            needs: ichNeeds
        };
        const person2 = {
            archetyp: window.getPartnerArchetype(),
            ...window.personDimensions.partner,
            orientierung: window.ensureValidOrientierung(window.personDimensions.partner.orientierung),
            needs: partnerNeeds
        };

        // console.log('[updateComparisonView] person1:', JSON.stringify(person1)); // DISABLED: verursacht Message-Overflow
        // console.log('[updateComparisonView] person2:', JSON.stringify(person2)); // DISABLED: verursacht Message-Overflow
        // console.log('[updateComparisonView] SSOT: ichNeeds:', !!ichNeeds, 'partnerNeeds:', !!partnerNeeds); // DISABLED: verursacht Message-Overflow

        const pathosCheck = window.checkPhysicalCompatibility(person1, person2);
        // console.log('[updateComparisonView] pathosCheck:', JSON.stringify(pathosCheck)); // DISABLED: verursacht Message-Overflow
        const logosCheck = window.calculatePhilosophyCompatibility(window.getIchArchetype(), window.getPartnerArchetype());

        // Update warnings
        const warningsContainer = document.getElementById('warningsContainer');
        warningsContainer.innerHTML = '';

        if (pathosCheck.result === 'unvollständig') {
            let warningHTML = '<div class="warning-box incomplete-warning">⚠️ Es fehlt noch:';
            if (pathosCheck.missingItems && pathosCheck.missingItems.length > 0) {
                warningHTML += '<ul style="margin: 5px 0 0 20px; padding: 0;">';
                pathosCheck.missingItems.forEach(item => {
                    warningHTML += `<li>${item}</li>`;
                });
                warningHTML += '</ul>';
            }
            warningHTML += '</div>';
            warningsContainer.innerHTML = warningHTML;
        } else if (pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung') {
            // v4.0: 'hohe_reibung' ersetzt 'unmöglich' - gleiche Behandlung in der UI
            warningsContainer.innerHTML = `<div class="warning-box pathos-warning">🚫 ${TiageI18n.t('warnings.noAttraction', 'Keine emotionale/körperliche Anziehung:')} ${pathosCheck.reason || TiageI18n.t('warnings.noAttractionDesc', 'Orientierungs-Inkompatibilität verhindert romantische Beziehung')}</div>`;
        } else if (pathosCheck.result === 'unsicher') {
            warningsContainer.innerHTML = `<div class="warning-box logos-warning">⚠️ ${TiageI18n.t('warnings.uncertainAttraction', 'Unsichere körperliche Anziehung (Exploration-Phase)')}</div>`;
        }

        // Warnung bei unsicherem Dominanz-Status (prüfe ob mindestens eine Auswahl "interessiert" ist)
        const hasInteressiert1 = person1.dominanz && Object.values(person1.dominanz).some(s => s === 'interessiert');
        const hasInteressiert2 = person2.dominanz && Object.values(person2.dominanz).some(s => s === 'interessiert');
        if (hasInteressiert1 || hasInteressiert2) {
            warningsContainer.innerHTML += `<div class="warning-box logos-warning">⚠️ ${TiageI18n.t('warnings.uncertainDominance', 'Unsichere Dominanz-Dynamik (Exploration-Phase – reduzierte Konfidenz)')}</div>`;
        }

        if (logosCheck.score < 50) {
            warningsContainer.innerHTML += `<div class="warning-box logos-warning">⚠️ ${TiageI18n.t('warnings.philosophyWarning', 'Verstandsebene-Warnung: Philosophie nur {score}').replace('{score}', logosCheck.score)}</div>`;
        }

        // If dimensions incomplete, show empty state and return
        if (pathosCheck.result === 'unvollständig') {
            // Clear all expandable sections
            const percentage = document.getElementById('resultPercentage');
            const progressFill = document.getElementById('resultProgressFill');
            percentage.textContent = '–';
            percentage.className = 'result-percentage';
            progressFill.style.width = '0%';

            // Update desktop circle for incomplete state
            const desktopCircle = document.getElementById('desktopCirclePercentage');
            if (desktopCircle) desktopCircle.textContent = '–';
            const desktopScoreCircle = document.getElementById('desktopScoreCircle');
            if (desktopScoreCircle) desktopScoreCircle.style.background = 'transparent';

            const categoryBars = document.getElementById('expandCategoryBars');
            if (categoryBars) categoryBars.innerHTML = '<p style="color: var(--text-muted); font-style: italic; text-align: center; padding: 20px;">' + TiageI18n.t('toast.selectAllDimensions', 'Bitte alle Dimensionen auswählen.') + '</p>';

            const expandRadar = document.getElementById('expandRadarChart');
            if (expandRadar) expandRadar.innerHTML = '';

            const desktopScoreNoteIncomplete = document.getElementById('desktopScoreNote');
            if (desktopScoreNoteIncomplete) desktopScoreNoteIncomplete.textContent = TiageI18n.t('ui.selectAllDimensions', 'Bitte alle Dimensionen auswählen.');

            // KO-Text ausblenden bei unvollständigen Dimensionen (Desktop)
            const desktopKoTextIncomplete = document.getElementById('desktopKoTextDisplay');
            if (desktopKoTextIncomplete) {
                desktopKoTextIncomplete.style.display = 'none';
                desktopKoTextIncomplete.innerHTML = '';
            }

            // KO-Text ausblenden bei unvollständigen Dimensionen (Mobile)
            const mobileKoTextIncomplete = document.getElementById('mobileKoTextDisplay');
            if (mobileKoTextIncomplete) {
                mobileKoTextIncomplete.style.display = 'none';
                mobileKoTextIncomplete.innerHTML = '';
            }

            // Update Score-Circle auch bei unvollständigen Dimensionen
            window.updateSyntheseScoreCycle();
            return;
        }

        // Calculate overall score
        let overallScore = 0;
        let qualityBreakdown = { archetyp: 0, dominanz: 0, orientierung: 0, geschlecht: 0 };

        // v4.0 FIX: 'hohe_reibung' aus physicalCompatibility.js muss auch als inkompatibel behandelt werden
        const isIncompatible = pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung';

        if (!isIncompatible) {
            try {
                // SSOT v3.10: R-Faktoren aus person.needs (TiageState)
                const result = window.calculateOverallWithModifiers(person1, person2, pathosCheck, logosCheck);
                overallScore = result.overall;
                qualityBreakdown = result.breakdown || qualityBreakdown;
                // console.log('[TIAGE] Score calculated:', overallScore, 'breakdown:', qualityBreakdown); // DISABLED: verursacht Message-Overflow

                // Update expandable category bars
                updateExpandableCategoryBars(result.categories);

                // Update R-Factor Display (Resonanz der Paarung)
                window.updateRFactorDisplay();
            } catch (e) {
                console.error('[TIAGE] calculateOverallWithModifiers error:', e);
            }
        }

        // Update 4-Factor Breakdown (Desktop)
        const factorArchetyp = document.getElementById('desktopFactorArchetyp');
        const factorDominanz = document.getElementById('desktopFactorDominanz');
        const factorOrientierung = document.getElementById('desktopFactorOrientierung');
        const factorGeschlecht = document.getElementById('desktopFactorGeschlecht');

        if (factorArchetyp) factorArchetyp.textContent = qualityBreakdown.archetyp;
        if (factorDominanz) factorDominanz.textContent = qualityBreakdown.dominanz;
        if (factorOrientierung) factorOrientierung.textContent = qualityBreakdown.orientierung;
        if (factorGeschlecht) factorGeschlecht.textContent = qualityBreakdown.geschlecht;

        // Update expandable desktop factor content
        window.updateDesktopFactorContent();

        // Update result bar
        const percentage = document.getElementById('resultPercentage');
        const progressFill = document.getElementById('resultProgressFill');

        percentage.textContent = overallScore.toFixed(1);
        progressFill.style.width = Math.min(100, overallScore) + '%';

        // Update desktop score circle
        const desktopCircle = document.getElementById('desktopCirclePercentage');
        if (desktopCircle) {
            desktopCircle.textContent = overallScore.toFixed(1);
        }

        // Set color based on score (3-Stufen-Skala: 70/50)
        let colorClass = 'low';
        let color = 'var(--danger)';
        if (overallScore >= 70) { colorClass = 'good'; color = 'var(--primary)'; }
        else if (overallScore >= 50) { colorClass = 'moderate'; color = 'var(--warning)'; }

        percentage.className = 'result-percentage ' + colorClass;
        progressFill.style.background = color;

        // Update desktop circle color
        const desktopScoreCircle = document.getElementById('desktopScoreCircle');
        if (desktopScoreCircle) {
            desktopScoreCircle.style.background = 'transparent';
        }

        // ═══════════════════════════════════════════════════════════════
        // DESKTOP KO-TEXT DISPLAY (unter dem Score Circle)
        // v4.0 FIX: 'hohe_reibung' aus physicalCompatibility.js muss auch als inkompatibel behandelt werden
        // ═══════════════════════════════════════════════════════════════
        const desktopKoTextDisplay = document.getElementById('desktopKoTextDisplay');
        if (desktopKoTextDisplay) {
            if (pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung') {
                // KO-Text anzeigen
                const koReason = pathosCheck.reason || 'Inkompatible Orientierungen';
                desktopKoTextDisplay.innerHTML = '<span class="ko-title">⚠️ K.O.-Kriterium</span><span class="ko-reason">' + koReason + '</span>';
                desktopKoTextDisplay.style.display = 'block';
            } else {
                // KO-Text ausblenden
                desktopKoTextDisplay.style.display = 'none';
                desktopKoTextDisplay.innerHTML = '';
            }
        }

        // ═══════════════════════════════════════════════════════════════
        // MOBILE KO-TEXT DISPLAY (unter dem Score Circle auf Page 3)
        // v4.0 FIX: 'hohe_reibung' aus physicalCompatibility.js muss auch als inkompatibel behandelt werden
        // ═══════════════════════════════════════════════════════════════
        const mobileKoTextDisplay = document.getElementById('mobileKoTextDisplay');
        if (mobileKoTextDisplay) {
            if (pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung') {
                // KO-Text anzeigen
                const koReason = pathosCheck.reason || 'Inkompatible Orientierungen';
                mobileKoTextDisplay.innerHTML = '<span class="ko-title">⚠️ K.O.-Kriterium</span><br><span class="ko-reason">' + koReason + '</span>';
                mobileKoTextDisplay.style.display = 'block';
            } else {
                // KO-Text ausblenden
                mobileKoTextDisplay.style.display = 'none';
                mobileKoTextDisplay.innerHTML = '';
            }
        }

        // Update Desktop Score Note (direkt beim Kreis) - 3-Stufen-Skala
        const desktopScoreNote = document.getElementById('desktopScoreNote');
        if (desktopScoreNote) {
            let noteText = '';
            let quoteText = '';
            let quoteSource = '';

            // Bestimme Resonanzlevel basierend auf Score
            let resonanceLevel = 'niedrig';
            if (overallScore >= 80) resonanceLevel = 'hoch';
            else if (overallScore >= 50) resonanceLevel = 'mittel';

            // v4.0 FIX: 'hohe_reibung' muss auch als inkompatibel behandelt werden
            const isCompatibleForQuotes = pathosCheck.result !== 'unmöglich' && pathosCheck.result !== 'hohe_reibung';

            // Versuche Zitat aus ResonanceQuotesTable zu holen
            if (typeof ResonanceQuotesTable !== 'undefined' && isCompatibleForQuotes) {
                const category = overallScore >= 65 ? 'RESONANCE' : overallScore >= 50 ? 'GROWTH' : 'AWARENESS';
                const result = ResonanceQuotesTable.generateResonanceText(resonanceLevel, category, 'de');

                if (result && result.quote) {
                    noteText = result.title;
                    quoteText = result.quote;
                    quoteSource = result.quoteSource ? ` — ${result.quoteSource}` : '';
                }
            }

            // Fallback zu hardcoded Texten
            if (!quoteText) {
                if (pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung') {
                    noteText = TiageI18n.t('quality.noResonance', 'Keine Basis für Resonanz vorhanden.');
                    quoteText = TiageI18n.t('quality.noResonanceDesc', 'Diese Beziehung zeigt eine Qualität von {score} – keine kompatible Basis vorhanden, deren Muster sich ausschließen.').replace('{score}', overallScore);
                } else if (overallScore >= 70) {
                    noteText = TiageI18n.t('quality.goodResonance', 'Gute Resonanz – Muster ergänzen sich.');
                    quoteText = TiageI18n.t('quality.goodResonanceDesc', 'Diese Beziehung zeigt eine Qualität von {score} – eine gute Resonanz zwischen zwei Menschen, deren Muster sich ergänzen.').replace('{score}', overallScore);
                } else if (overallScore >= 50) {
                    noteText = TiageI18n.t('quality.basisPresent', 'Basis vorhanden, Arbeit erforderlich.');
                    quoteText = TiageI18n.t('quality.basisPresentDesc', 'Diese Beziehung zeigt eine Qualität von {score} – eine Basis ist vorhanden, erfordert aber bewusste Arbeit und Kommunikation.').replace('{score}', overallScore);
                } else {
                    noteText = TiageI18n.t('quality.reflectionNeeded', 'Bewusste Reflexion erforderlich.');
                    quoteText = TiageI18n.t('quality.reflectionNeededDesc', 'Diese Beziehung zeigt eine Qualität von {score} – bewusste Reflexion und offene Kommunikation sind erforderlich.').replace('{score}', overallScore);
                }
            }

            desktopScoreNote.innerHTML = '<strong>' + noteText + '</strong><br><span style="font-style: italic; opacity: 0.85; font-size: 0.9em;">"' + quoteText + '"' + quoteSource + '</span>';
        }

        // Update Radar Chart
        const interactionKey = `${window.getIchArchetype()}_${window.getPartnerArchetype()}`;
        const interaction = window.tiageData.interactions?.[interactionKey] || {};
        window.drawRadarChart(interaction.scores || {}, partnerArch?.color || '#457B9D');

        // Update Desktop Selection Info Message
        window.updateSelectionInfoMessage();

        // Update Score-Circle auf der Hauptseite
        window.updateSyntheseScoreCycle();
    }

    // Universelle Funktion für Kategorien-Balken (Mobile & Desktop)
    const categoryNamesMap = {
        A: 'Beziehungsphilosophie',
        B: 'Werte-Alignment',
        C: 'Nähe-Distanz',
        D: 'Autonomie',
        E: 'Kommunikation',
        F: 'Soziale Kompatibilität'
    };

    function renderCategoryBars(containerId, categories) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = '';
        for (const [cat, catData] of Object.entries(categories)) {
            const score = catData.score || 0;
            let colorClass = 'low';
            if (score >= 70) colorClass = 'good';
            else if (score >= 50) colorClass = 'moderate';

            html += `
                <div class="category-bar-row clickable-bar" style="margin-bottom: 12px; cursor: pointer; padding: 8px; border-radius: 8px; transition: background 0.2s;" onclick="showCategoryDetails('${cat}')" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                        <span style="font-size: 12px; color: var(--text-secondary);">${cat}: ${categoryNamesMap[cat]}</span>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 12px; font-weight: 600;" class="${colorClass}">${score}%</span>
                            <span style="font-size: 10px; color: var(--text-muted);">ℹ</span>
                        </div>
                    </div>
                    <div style="height: 6px; background: var(--bg-dark); border-radius: 3px; overflow: hidden;">
                        <div style="height: 100%; width: ${score}%; background: var(--${colorClass === 'good' ? 'primary' : colorClass === 'moderate' ? 'warning' : 'danger'}); border-radius: 3px;"></div>
                    </div>
                </div>
            `;
        }
        container.innerHTML = html;
    }

    // Desktop: Wrapper für Kompatibilität
    function updateExpandableCategoryBars(categories) {
        renderCategoryBars('expandCategoryBars', categories);
    }

    function showArchetypeInfo(person) {
        console.log('showArchetypeInfo called with:', person);
        const archetype = person === 'ich' ? window.getIchArchetype() : window.getPartnerArchetype();
        console.log('archetype:', archetype, 'window.tiageData:', window.tiageData);
        if (!window.tiageData || !window.tiageData.archetypes || !window.tiageData.archetypes[archetype]) {
            console.error('Data not available for archetype:', archetype);
            return;
        }

        // Set current index for swipe navigation
        currentDefinitionIndex = archetypeOrder.indexOf(archetype);
        if (currentDefinitionIndex === -1) currentDefinitionIndex = 0;
        currentDefinitionPerson = person;

        // Use the shared function to render content
        window.showArchetypeInfoByType(archetype);

        document.getElementById('definitionModal').classList.add('active');
        document.body.style.overflow = 'hidden';

        // Add touch swipe support
        const modal = document.querySelector('#definitionModal .modal');
        modal.ontouchstart = handleDefinitionTouchStart;
        modal.ontouchend = handleDefinitionTouchEnd;
    }

    // ── Exports ─────────────────────────────────────────────────────────────
    window.updateComparisonView = updateComparisonView;
    window.updateExpandableCategoryBars = updateExpandableCategoryBars;
    window.renderCategoryBars = renderCategoryBars;
    window.showArchetypeInfo = showArchetypeInfo;

})();
