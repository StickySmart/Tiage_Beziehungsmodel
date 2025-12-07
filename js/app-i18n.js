/**
 * TIAGE App - i18n Update Functions
 * Extracted from archetype-interaction.html for modularization
 *
 * (c) 2025 Ti-age.de - All rights reserved
 */

        /**
         * Update all translatable elements on the page
         * Called when language is changed
         */
        function updateAllTranslations() {
            const lang = TiageI18n.getLanguage();

            // Update language code display
            const langCodeEl = document.getElementById('currentLangCode');
            if (langCodeEl) {
                langCodeEl.textContent = lang.toUpperCase();
            }

            // Update HTML lang attribute
            document.documentElement.lang = lang;

            // Update page title
            const h1 = document.querySelector('h1[data-i18n]');
            if (h1) {
                const titleKey = h1.getAttribute('data-i18n');
                const translated = TiageI18n.t(titleKey);
                if (translated && translated !== titleKey) {
                    h1.textContent = translated.toUpperCase();
                }
            }

            // Update all elements with data-i18n attribute
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const translated = TiageI18n.t(key);
                if (translated && translated !== key) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = translated;
                    } else {
                        el.textContent = translated;
                    }
                }
            });

            // Update all elements with data-i18n-title attribute (for tooltips)
            document.querySelectorAll('[data-i18n-title]').forEach(el => {
                const key = el.getAttribute('data-i18n-title');
                const translated = TiageI18n.t(key);
                if (translated && translated !== key) {
                    el.title = translated;
                }
            });

            // Update person labels (ICH/PARTNER -> ME/PARTNER)
            updatePersonLabels();

            // Update status buttons (Gelebt/Interessiert)
            updateStatusButtons();

            // Update dimension labels and tooltips
            updateDimensionLabels();

            // Update archetype names if displayed
            updateArchetypeNames();

            // Update category names
            updateCategoryNames();

            // Update column headers (DU/YOU, PARTNER)
            updateColumnHeaders();

            // Update dimension section labels
            updateDimensionSectionLabels();

            // Update geschlecht button labels
            updateGeschlechtButtons();

            // Update dominanz labels
            updateDominanzLabels();

            // Update orientierung labels
            updateOrientierungLabels();

            // Update GFK/NVC button labels
            updateGfkButtonLabels();
            updateGfkLabels();

            // Update fold/unfold button
            updateFoldUnfoldButton();

            // Update gender info modal
            updateGenderInfoModal();

            // Update impressum modal
            updateImpressumModal();

            // Update footer
            updateFooter();

            // Update age verification modal
            updateAgeVerificationModal();

            // Update analysis overview (Du ein / You a + Geschlecht)
            if (typeof window.updateAnalysisOverview === 'function') {
                window.updateAnalysisOverview();
            }

            // Trigger custom event for other scripts to react
            document.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language: lang, locale: TiageI18n.getLocale() }
            }));

            console.log('[i18n] All translations updated to:', lang);
        }

        /**
         * Update person labels (ICH/ME, PARTNER)
         */
        function updatePersonLabels() {
            // Desktop ICH/PARTNER labels
            document.querySelectorAll('.person-label-ich, [data-person="ich"] .person-label').forEach(el => {
                el.textContent = TiageI18n.t('ui.ich', 'ICH');
            });
            document.querySelectorAll('.person-label-partner, [data-person="partner"] .person-label').forEach(el => {
                el.textContent = TiageI18n.t('ui.partner', 'PARTNER');
            });

            // Update any elements with explicit data-i18n-person
            document.querySelectorAll('[data-i18n-person="ich"]').forEach(el => {
                el.textContent = TiageI18n.t('ui.ich', 'ICH');
            });
            document.querySelectorAll('[data-i18n-person="partner"]').forEach(el => {
                el.textContent = TiageI18n.t('ui.partner', 'PARTNER');
            });
        }

        /**
         * Update status button labels (Gelebt/Interessiert)
         */
        function updateStatusButtons() {
            document.querySelectorAll('[data-status="gelebt"]').forEach(el => {
                el.textContent = TiageI18n.t('ui.gelebt', 'Gelebt');
            });
            document.querySelectorAll('[data-status="interessiert"]').forEach(el => {
                el.textContent = TiageI18n.t('ui.interessiert', 'Interessiert');
            });
        }

        /**
         * Update dimension labels (Geschlecht, Dominanz, Orientierung)
         */
        function updateDimensionLabels() {
            // Update geschlecht primary (Körper) type labels
            const geschlechtPrimaryTypes = ['mann', 'frau', 'inter'];
            geschlechtPrimaryTypes.forEach(type => {
                document.querySelectorAll(`[data-geschlecht-primary="${type}"]`).forEach(el => {
                    el.textContent = TiageI18n.t(`geschlecht.primary.${type}`, type);
                });
            });

            // Update geschlecht secondary (Identität) type labels
            const geschlechtSecondaryTypes = ['mann', 'frau', 'nonbinaer', 'fluid', 'unsicher'];
            geschlechtSecondaryTypes.forEach(type => {
                document.querySelectorAll(`[data-geschlecht-secondary="${type}"]`).forEach(el => {
                    el.textContent = TiageI18n.t(`geschlecht.secondary.${type}`, type);
                });
            });

            // Update geschlecht row labels
            document.querySelectorAll('.geschlecht-row-label').forEach(el => {
                if (el.textContent.includes('Körper')) {
                    el.textContent = TiageI18n.t('geschlecht.primaryLabel', 'Körper') + ':';
                } else if (el.textContent.includes('Identität')) {
                    el.textContent = TiageI18n.t('geschlecht.secondaryLabel', 'Identität') + ':';
                }
            });

            // Legacy: Update old geschlecht type labels (für Rückwärtskompatibilität)
            const geschlechtLegacyTypes = ['cis_mann', 'cis_frau', 'trans_mann', 'trans_frau', 'nonbinaer', 'genderfluid', 'agender', 'intersex', 'divers'];
            geschlechtLegacyTypes.forEach(type => {
                document.querySelectorAll(`[data-geschlecht="${type}"]`).forEach(el => {
                    el.textContent = TiageI18n.t(`geschlecht.types.${type}`, type);
                });
            });

            // Update dominanz type labels
            const dominanzTypes = ['dominant', 'submissiv', 'switch', 'ausgeglichen'];
            dominanzTypes.forEach(type => {
                document.querySelectorAll(`[data-dominanz="${type}"]`).forEach(el => {
                    el.textContent = TiageI18n.t(`dominanz.types.${type}`, type);
                });
            });

            // Update orientierung type labels
            const orientierungTypes = ['heterosexuell', 'homosexuell', 'bisexuell'];
            orientierungTypes.forEach(type => {
                document.querySelectorAll(`[data-orientierung="${type}"]`).forEach(el => {
                    el.textContent = TiageI18n.t(`orientierung.types.${type}`, type);
                });
            });
        }

        /**
         * Update archetype names
         */
        function updateArchetypeNames() {
            const archetypes = ['single', 'duo', 'duo_flex', 'solopoly', 'polyamor', 'ra', 'lat', 'aromantisch'];

            // Update elements with data-archetype-name attribute
            archetypes.forEach(type => {
                document.querySelectorAll(`[data-archetype-name="${type}"]`).forEach(el => {
                    el.textContent = TiageI18n.t(`archetypes.${type}.name`, type);
                });
            });

            // Update select options (ichSelect, partnerSelect, mobile selects)
            document.querySelectorAll('#ichSelect option, #partnerSelect option, #mobile-ich-select option, #mobile-partner-select option').forEach(option => {
                const value = option.value;
                if (archetypes.includes(value)) {
                    option.textContent = TiageI18n.t(`archetypes.${value}.name`, option.textContent);
                    option.title = TiageI18n.t(`archetypes.${value}.shortDef`, option.title);
                }
            });

            // Update archetype symbol names in grids
            document.querySelectorAll('.archetype-symbol-name').forEach(el => {
                const parent = el.closest('[data-archetype]');
                if (parent) {
                    const type = parent.dataset.archetype;
                    if (archetypes.includes(type)) {
                        el.textContent = TiageI18n.t(`archetypes.${type}.name`, el.textContent);
                    }
                }
            });
        }

        /**
         * Update category names (A-F)
         */
        function updateCategoryNames() {
            const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
            categories.forEach(cat => {
                document.querySelectorAll(`[data-category-name="${cat}"]`).forEach(el => {
                    el.textContent = TiageI18n.t(`categories.${cat}`, cat);
                });
            });
        }

        /**
         * Update column headers (DU/YOU, PARTNER)
         */
        function updateColumnHeaders() {
            // Update ICH/YOU column title
            document.querySelectorAll('.ich-column .column-title').forEach(el => {
                el.textContent = TiageI18n.t('columns.you', 'DU');
            });
            // Update PARTNER column title
            document.querySelectorAll('.partner-column .column-title').forEach(el => {
                el.textContent = TiageI18n.t('columns.partner', 'PARTNER');
            });
            // Update navigation button titles
            document.querySelectorAll('.archetype-nav-btn').forEach(btn => {
                const direction = btn.innerHTML.includes('9664') ? 'previous' : 'next';
                btn.title = TiageI18n.t(`columns.${direction}Archetype`, direction === 'previous' ? 'Vorheriger Archetyp' : 'Nächster Archetyp');
            });
            // Update INFO buttons
            document.querySelectorAll('.archetype-info-btn').forEach(btn => {
                btn.title = TiageI18n.t('columns.archetypeInfo', 'Info zum Archetyp');
            });
        }

        /**
         * Update dimension section labels (Geschlechtsidentität, Dominanz, Orientierung, GFK)
         * Uses specific CSS classes for each dimension type
         */
        function updateDimensionSectionLabels() {
            // Update Geschlechtsidentität labels
            document.querySelectorAll('.geschlecht-info-link').forEach(el => {
                el.textContent = TiageI18n.t('dimensions.geschlechtLabel', 'Geschlechtsidentität');
            });

            // Update Dominanz labels
            document.querySelectorAll('.dominanz-info-link').forEach(el => {
                el.textContent = TiageI18n.t('dimensions.dominanzLabel', 'Dominanz');
            });

            // Update Orientierung labels
            document.querySelectorAll('.orientierung-info-link').forEach(el => {
                el.textContent = TiageI18n.t('dimensions.orientierungLabel', 'Orientierung');
            });

            // Update GFK labels
            document.querySelectorAll('.gfk-info-link').forEach(el => {
                el.textContent = TiageI18n.t('dimensions.gfkLabel', 'GFK-Kompetenz');
            });

            // Update Dominanz section labels (preserving CSS classes)
            document.querySelectorAll('[data-dimension$="-dominanz-multi"] > .compact-dimension-label > span:first-child').forEach(el => {
                const dominanzLink = el.querySelector('.dominanz-info-link');
                const legendSpan = el.querySelector('span:not(.dominanz-info-link)');
                if (dominanzLink && legendSpan) {
                    const p = TiageI18n.t('dimensions.legend.primary', 'P');
                    const s = TiageI18n.t('dimensions.legend.secondary', 'S');
                    const pFull = TiageI18n.t('dimensions.legend.primaryFull', 'Primär');
                    const sFull = TiageI18n.t('dimensions.legend.secondaryFull', 'Sekundär');
                    dominanzLink.textContent = TiageI18n.t('dimensions.dominanzLabel', 'Dominanz');
                    legendSpan.innerHTML = `(${p}=${pFull}, ${s}=${sFull})`;
                }
            });

            // Update Orientierung section labels (preserving CSS classes)
            document.querySelectorAll('[data-dimension$="-orientierung-multi"] > .compact-dimension-label > span:first-child').forEach(el => {
                const orientierungLink = el.querySelector('.orientierung-info-link');
                const legendSpan = el.querySelector('span:not(.orientierung-info-link)');
                if (orientierungLink && legendSpan) {
                    const p = TiageI18n.t('dimensions.legend.primary', 'P');
                    const s = TiageI18n.t('dimensions.legend.secondary', 'S');
                    const pFull = TiageI18n.t('dimensions.legend.primaryFull', 'Primär');
                    const sFull = TiageI18n.t('dimensions.legend.secondaryFull', 'Sekundär');
                    orientierungLink.textContent = TiageI18n.t('dimensions.orientierungLabel', 'Orientierung');
                    legendSpan.innerHTML = `(${p}=${pFull}, ${s}=${sFull})`;
                }
            });

            // Update legend (P=Primär, S=Sekundär)
            document.querySelectorAll('.geschlecht-legend').forEach(el => {
                const p = TiageI18n.t('dimensions.legend.primary', 'P');
                const s = TiageI18n.t('dimensions.legend.secondary', 'S');
                const pFull = TiageI18n.t('dimensions.legend.primaryFull', 'Primär');
                const sFull = TiageI18n.t('dimensions.legend.secondaryFull', 'Sekundär');
                el.innerHTML = `(<span class="legend-p">${p}</span>=${pFull}, <span class="legend-s">${s}</span>=${sFull})`;
            });
        }

        /**
         * Update geschlecht button labels
         */
        function updateGeschlechtButtons() {
            // P/S SYSTEM: Primary (Körper) Buttons - P-Grid
            const geschlechtPrimaryTypes = ['mann', 'frau', 'inter'];
            geschlechtPrimaryTypes.forEach(type => {
                document.querySelectorAll(`.geschlecht-p-grid .geschlecht-btn[data-value="${type}"]`).forEach(btn => {
                    btn.textContent = TiageI18n.t(`geschlecht.primary.${type}`, type);
                });
            });

            // P/S SYSTEM: Secondary (Identität) Buttons - S-Grid
            const geschlechtSecondaryTypes = ['cis', 'trans', 'nonbinaer', 'fluid', 'unsicher'];
            geschlechtSecondaryTypes.forEach(type => {
                document.querySelectorAll(`.geschlecht-s-grid .geschlecht-btn[data-value="${type}"]`).forEach(btn => {
                    btn.textContent = TiageI18n.t(`geschlecht.secondary.${type}`, type);
                });
            });
        }

        /**
         * Update dominanz labels in the multi-select rows and grid buttons
         */
        function updateDominanzLabels() {
            const dominanzTypes = ['dominant', 'submissiv', 'switch', 'ausgeglichen'];

            // Update multi-select row labels
            dominanzTypes.forEach(type => {
                document.querySelectorAll(`.dominanz-label`).forEach(el => {
                    if (el.getAttribute('onclick')?.includes(`'${type}'`)) {
                        el.textContent = TiageI18n.t(`dominanz.types.${type}`, type).toLowerCase();
                    }
                });
            });

            // Update grid buttons
            document.querySelectorAll('.dominanz-btn').forEach(btn => {
                const value = btn.getAttribute('data-value');
                if (value && dominanzTypes.includes(value)) {
                    btn.textContent = TiageI18n.t(`dominanz.types.${value}`, value);
                }
            });
        }

        /**
         * Update orientierung labels in the multi-select rows and grid buttons
         */
        function updateOrientierungLabels() {
            const orientierungTypes = ['heterosexuell', 'homosexuell', 'bisexuell'];

            // Update multi-select row labels
            orientierungTypes.forEach(type => {
                document.querySelectorAll(`.dominanz-label`).forEach(el => {
                    if (el.getAttribute('onclick')?.includes(`'${type}'`)) {
                        el.textContent = TiageI18n.t(`orientierung.types.${type}`, type).toLowerCase();
                    }
                });
            });

            // Update grid buttons
            document.querySelectorAll('.orientierung-btn').forEach(btn => {
                const value = btn.getAttribute('data-value');
                if (value && orientierungTypes.includes(value)) {
                    btn.textContent = TiageI18n.t(`orientierung.types.${value}`, value);
                }
            });
        }

        /**
         * Update GFK/NVC competence labels
         */
        function updateGfkLabels() {
            const gfkLevels = ['niedrig', 'mittel', 'hoch'];

            // Update GFK grid buttons
            document.querySelectorAll('.gfk-btn').forEach(btn => {
                const value = btn.getAttribute('data-value');
                if (value && gfkLevels.includes(value)) {
                    btn.textContent = TiageI18n.t(`gfk.levels.${value}`, value);
                }
            });
        }

        /**
         * Update GFK/NVC button labels
         */
        function updateGfkButtonLabels() {
            const gfkLevels = ['niedrig', 'mittel', 'hoch'];
            document.querySelectorAll('.gfk-btn').forEach(btn => {
                const value = btn.dataset.value;
                if (value && gfkLevels.includes(value)) {
                    btn.textContent = TiageI18n.t(`dimensions.gfkLevels.${value}`, value);
                }
            });

            // Update GFK labels in info links
            document.querySelectorAll('.gfk-info-link').forEach(el => {
                el.textContent = TiageI18n.t('dimensions.gfkLabel', 'GFK-Kompetenz');
            });

            // Update Bedürfnis-Übereinstimmung label
            document.querySelectorAll('.gfk-level-label').forEach(el => {
                el.textContent = TiageI18n.t('needs.matchLabel', 'Bedürfnis-Übereinstimmung');
            });
        }

        /**
         * Update fold/unfold button text
         */
        function updateFoldUnfoldButton() {
            const btn = document.getElementById('foldUnfoldAllBtn');
            if (btn) {
                const textEl = btn.querySelector('.fold-unfold-text');
                if (textEl) {
                    const isUnfolded = !btn.classList.contains('folded');
                    textEl.textContent = isUnfolded ?
                        TiageI18n.t('foldUnfold.fold', 'Einklappen') :
                        TiageI18n.t('foldUnfold.unfold', 'Ausklappen');
                }
            }
        }

        /**
         * Update gender info modal content
         */
        function updateGenderInfoModal() {
            // Update title
            const title = document.querySelector('#geschlechtInfoModal .dimension-tooltip-title');
            if (title) {
                title.textContent = TiageI18n.t('genderInfoModal.title', 'Geschlechtsidentitäten');
            }

            // Update "Verstanden" button
            const understoodBtn = document.querySelector('#geschlechtInfoModal .dimension-tooltip-close');
            if (understoodBtn) {
                understoodBtn.textContent = TiageI18n.t('genderInfoModal.understood', 'Verstanden');
            }

            // Update gender identity items
            const genderTypes = ['cis_mann', 'cis_frau', 'trans_mann', 'trans_frau', 'nonbinaer', 'genderfluid', 'agender', 'intersex', 'divers'];
            const items = document.querySelectorAll('#geschlechtInfoModal .geschlecht-info-item');
            items.forEach((item, index) => {
                if (index < genderTypes.length) {
                    const type = genderTypes[index];
                    const nameEl = item.querySelector('.geschlecht-info-name');
                    const descEl = item.querySelector('.geschlecht-info-desc');
                    const tooltip = TiageI18n.t(`tooltips.${type}`);
                    if (nameEl && tooltip && tooltip.title) {
                        nameEl.textContent = tooltip.title;
                    }
                    if (descEl && tooltip && tooltip.text) {
                        descEl.textContent = tooltip.text;
                    }
                }
            });
        }

        /**
         * Update impressum modal content
         */
        function updateImpressumModal() {
            const modal = document.getElementById('impressumModal');
            if (!modal) return;

            const title = modal.querySelector('h3');
            if (title) {
                title.textContent = TiageI18n.t('impressum.title', 'Impressum');
            }
        }

        /**
         * Update footer translations
         */
        function updateFooter() {
            const footer = document.querySelector('footer');
            if (!footer) return;

            // Update Datenschutz link
            const datenschutzLink = footer.querySelector('a[href="datenschutz.html"]');
            if (datenschutzLink) {
                datenschutzLink.textContent = TiageI18n.t('footer.datenschutz', 'Datenschutz');
            }

            // Update Nutzungsbedingungen link
            const nutzungsLink = footer.querySelector('a[href="nutzungsbedingungen.html"]');
            if (nutzungsLink) {
                nutzungsLink.textContent = TiageI18n.t('footer.nutzungsbedingungen', 'Nutzungsbedingungen');
            }

            // Update Impressum link
            const impressumLink = footer.querySelector('a[onclick*="impressumModal"]');
            if (impressumLink) {
                impressumLink.textContent = TiageI18n.t('footer.impressum', 'Impressum');
            }

            // Update copyright text
            const copyrightEl = footer.querySelector('div[style*="border-top"] > div:first-child');
            if (copyrightEl) {
                const year = new Date().getFullYear();
                const copyright = TiageI18n.t('footer.copyright', 'Alle Rechte vorbehalten');
                copyrightEl.innerHTML = `&copy; ${year} Ti-Age - ${copyright}`;
            }

            // Update Hilfe/Help link
            const hilfeLink = footer.querySelector('a[href*="help-guide"]');
            if (hilfeLink) {
                hilfeLink.textContent = TiageI18n.t('helpModal.title', 'Hilfe').split(' ')[0]; // Just "Hilfe" or "Help"
            }
        }

        /**
         * Update age verification modal content
         */
        function updateAgeVerificationModal() {
            const modal = document.getElementById('ageVerificationModal');
            if (!modal) return;

            const lang = TiageI18n.getLanguage();

            // Update language code display in age verification
            const langCodeEl = document.getElementById('ageVerifyLangCode');
            if (langCodeEl) {
                langCodeEl.textContent = lang.toUpperCase();
            }

            const title = modal.querySelector('h2');
            if (title) {
                title.textContent = TiageI18n.t('ageVerification.title', 'Altersverifikation');
            }

            // Update description
            const description = modal.querySelector('p[data-i18n="ageVerification.description"]');
            if (description) {
                description.textContent = TiageI18n.t('ageVerification.description', 'Diese Seite enthält Inhalte über Beziehungsmodelle und ist nur für Personen ab 18 Jahren bestimmt.');
            }

            // Update terms text with HTML content
            const termsEl = document.getElementById('ageVerificationTerms');
            if (termsEl) {
                if (lang === 'en') {
                    termsEl.innerHTML = `By clicking "Yes" you confirm that you:<br>
                        • are of legal age (at least 18 years old)<br>
                        • accept the <a href="terms-of-use.html" target="_blank" style="color: #4A90E2; text-decoration: underline;">Terms of Use</a> and <a href="privacy-policy.html" target="_blank" style="color: #4A90E2; text-decoration: underline;">Privacy Policy</a><br>
                        • acknowledge that all content is protected by copyright<br>
                        • will use the content only for personal, non-commercial purposes`;
                } else {
                    termsEl.innerHTML = `Mit dem Klick auf "Ja" bestätigst du, dass du:<br>
                        • volljährig bist (mindestens 18 Jahre alt)<br>
                        • die <a href="nutzungsbedingungen.html" target="_blank" style="color: #4A90E2; text-decoration: underline;">Nutzungsbedingungen</a> und <a href="datenschutz.html" target="_blank" style="color: #4A90E2; text-decoration: underline;">Datenschutzerklärung</a> akzeptierst<br>
                        • zur Kenntnis nimmst, dass alle Inhalte urheberrechtlich geschützt sind<br>
                        • die Inhalte nur für persönliche, nicht-kommerzielle Zwecke nutzt`;
                }
            }

            const question = modal.querySelector('.age-verification-question strong');
            if (question) {
                question.textContent = TiageI18n.t('ageVerification.question', 'Bist du mindestens 18 Jahre alt?');
            }

            const yesBtn = modal.querySelector('.age-btn-yes');
            if (yesBtn) {
                yesBtn.textContent = TiageI18n.t('ageVerification.confirm', 'Ja, ich bin 18+');
            }

            const noBtn = modal.querySelector('.age-btn-no');
            if (noBtn) {
                noBtn.textContent = TiageI18n.t('ageVerification.deny', 'Nein');
            }
        }

        // Alias for age verification button onclick
        function updateAgeVerificationTexts() {
            updateAgeVerificationModal();
        }

        /**
         * Get translated tooltip content
         * @param {string} key - The tooltip key (e.g., 'geschlecht', 'dominant')
         * @returns {Object} { title, text }
         */
        function getTranslatedTooltip(key) {
            const tooltip = TiageI18n.t(`tooltips.${key}`);
            if (tooltip && typeof tooltip === 'object') {
                return tooltip;
            }
            return { title: key, text: '' };
        }

        // Subscribe to language changes for automatic updates
        if (typeof TiageI18n !== 'undefined') {
            TiageI18n.subscribe(function(event) {
                updateAllTranslations();
            });
        }

        // Initialize translations on page load
        document.addEventListener('DOMContentLoaded', function() {
            // Update language code display on load
            const langCodeEl = document.getElementById('currentLangCode');
            if (langCodeEl && typeof TiageI18n !== 'undefined') {
                langCodeEl.textContent = TiageI18n.getLanguage().toUpperCase();
            }
            // Run initial translation update (in case browser language was auto-detected to English)
            if (typeof TiageI18n !== 'undefined' && TiageI18n.getLanguage() !== 'de') {
                setTimeout(updateAllTranslations, 100);
            }
        });
