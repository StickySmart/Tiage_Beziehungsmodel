#!/usr/bin/env python3
"""
Extract three UI modules from js/app-main.js:
  - js/ui/updateRendering.js   (lines 541-952, 0-indexed 540-952)
  - js/ui/scoreDisplay.js      (lines 956-1224, 0-indexed 955-1223)
  - js/ui/cardNavigation.js    (lines 1226-1317, 0-indexed 1225-1316)
"""

import re
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with open(os.path.join(BASE, 'js', 'app-main.js'), 'r', encoding='utf-8') as f:
    lines = f.readlines()

# ── Extract blocks (1-indexed boundaries, end is inclusive) ──────────────────
# Block 1: lines 541-952 → indices 540:952  (line 953 = export → stub)
block1 = ''.join(lines[540:952])

# Block 2: lines 956-1224 → indices 955:1224
block2 = ''.join(lines[955:1224])

# Block 3: lines 1226-1317 → indices 1225:1317
block3 = ''.join(lines[1225:1317])

# ── Deindent 8 spaces ────────────────────────────────────────────────────────
def deindent(s):
    return re.sub(r'(?m)^        ', '', s)

block1 = deindent(block1)
block2 = deindent(block2)
block3 = deindent(block3)

# ── Substitutions helper ──────────────────────────────────────────────────────
def sub(text, old, new):
    return text.replace(old, new)

# ════════════════════════════════════════════════════════════════════════════════
# MODULE 1: updateRendering.js
# ════════════════════════════════════════════════════════════════════════════════
b1 = block1

# 1. data guard
b1 = sub(b1, 'if (!data || !data.archetypes) {\n                console.warn(\'[TIAGE] updateAll called before data loaded - skipping\');',
             'if (!window.tiageData || !window.tiageData.archetypes) {\n    console.warn(\'[TIAGE] updateAll called before data loaded - skipping\');')
b1 = sub(b1, 'if (!data || !data.archetypes) {\n            console.warn(\'[TIAGE] updateMyType called before data loaded\');',
             'if (!window.tiageData || !window.tiageData.archetypes) {\n        console.warn(\'[TIAGE] updateMyType called before data loaded\');')

# 2. data.archetypes / data.interactions → window.tiageData.*
b1 = sub(b1, 'data.archetypes', 'window.tiageData.archetypes')
b1 = sub(b1, 'data.interactions', 'window.tiageData.interactions')

# 3. currentArchetype reads
b1 = sub(b1, 'document.body.className = `theme-${currentArchetype}`;',
             'document.body.className = `theme-${window.getIchArchetype()}`;')

# In updateMyType
b1 = sub(b1, "const arch = window.tiageData.archetypes[currentArchetype];\n    if (!arch) return;",
             "const arch = window.tiageData.archetypes[window.getIchArchetype()];\n    if (!arch) return;")
b1 = sub(b1, "myTypeIcon.textContent = icons[currentArchetype];",
             "myTypeIcon.textContent = window.icons[window.getIchArchetype()];")
b1 = sub(b1, 'myTypeTooltip.textContent = window.getShortDef(currentArchetype);',
             'myTypeTooltip.textContent = window.getShortDef(window.getIchArchetype());')

# 4. archetypeOrder (already exported as window.archetypeOrder; keep declaration + export)
# No change needed for the const declaration itself

# 5. selectedPartner reads in updatePartnerSelector
b1 = sub(b1, "if (selectedPartner && !allPartners.find(o => o.id === selectedPartner)) {\n        selectedPartner = allPartners[0]?.id || null;\n    }",
             "if (window.getPartnerArchetype() && !allPartners.find(o => o.id === window.getPartnerArchetype())) {\n        window.setPartnerArchetype(allPartners[0]?.id || null);\n    }")
b1 = sub(b1, ".map(id => window.tiageData.archetypes[id])",
             ".map(id => window.tiageData.archetypes[id])")  # no-op, already correct
b1 = sub(b1, "class=\"partner-btn ${arch.id === selectedPartner ? 'active' : ''}\"",
             "class=\"partner-btn ${arch.id === window.getPartnerArchetype() ? 'active' : ''}\"")

# 6. selectPartner: replace body that sets selectedPartner / mobilePartnerArchetype / TiageState
b1 = sub(b1,
    'function selectPartner(partnerId) {\n'
    '    selectedPartner = partnerId;\n'
    '    mobilePartnerArchetype = partnerId;\n'
    '\n'
    '    // Sync with TiageState for persistence\n'
    '    if (typeof TiageState !== \'undefined\') {\n'
    '        TiageState.setArchetype(\'partner\', partnerId);\n'
    '    }\n'
    '\n'
    '    // Sync select dropdowns',
    'function selectPartner(partnerId) {\n'
    '    window.setPartnerArchetype(partnerId);\n'
    '\n'
    '    // Sync select dropdowns'
)

# 7. updateTopAndChallenge: currentArchetype → window.getIchArchetype()
b1 = sub(b1,
    'const key = `${currentArchetype}_${otherId}`;',
    'const key = `${window.getIchArchetype()}_${otherId}`;'
)
b1 = sub(b1,
    'const myArch = window.tiageData.archetypes[currentArchetype];\n\n    if (topMatch.id)',
    'const myArch = window.tiageData.archetypes[window.getIchArchetype()];\n\n    if (topMatch.id)'
)

# 8. updatePartnerView: currentArchetype / selectedPartner reads
b1 = sub(b1,
    'const myArch = window.tiageData.archetypes[currentArchetype];\n    const partnerArch = window.tiageData.archetypes[selectedPartner];\n    const interactionKey = `${currentArchetype}_${selectedPartner}`;',
    'const myArch = window.tiageData.archetypes[window.getIchArchetype()];\n    const partnerArch = window.tiageData.archetypes[window.getPartnerArchetype()];\n    const interactionKey = `${window.getIchArchetype()}_${window.getPartnerArchetype()}`;'
)
b1 = sub(b1,
    "document.getElementById('myTypeTooltipPage3').textContent = window.getShortDef(currentArchetype);",
    "document.getElementById('myTypeTooltipPage3').textContent = window.getShortDef(window.getIchArchetype());"
)
b1 = sub(b1,
    "document.getElementById('partnerTooltipPage3').textContent = window.getShortDef(selectedPartner);",
    "document.getElementById('partnerTooltipPage3').textContent = window.getShortDef(window.getPartnerArchetype());"
)

# 9. categoryNames
b1 = sub(b1, 'categoryNames[cat]', 'window.categoryNames[cat]')

# 10. getBarClass
b1 = sub(b1, 'const barClass = getBarClass(value);', 'const barClass = TiageChartUtils.getBarClass(value);')

# 11. runCompatibilityChecks
b1 = sub(b1, 'runCompatibilityChecks();', 'window.runCompatibilityChecks();')

# 12. updateGfkFromArchetypes
b1 = sub(b1,
    'if (typeof updateGfkFromArchetypes === \'function\') {\n        updateGfkFromArchetypes();\n    }',
    'if (typeof window.updateGfkFromArchetypes === \'function\') {\n    window.updateGfkFromArchetypes();\n    }'
)
b1 = sub(b1, "    // NEU: GFK-Bedürfnis-Matching mit allen Dimensionen neu berechnen\n    updateGfkFromArchetypes();",
             "    // NEU: GFK-Bedürfnis-Matching mit allen Dimensionen neu berechnen\n    window.updateGfkFromArchetypes();")

# 13. updateArchetypeGrid
b1 = sub(b1, "updateArchetypeGrid('partner', partnerId);", "window.updateArchetypeGrid('partner', partnerId);")

# 14. updateAnalysisOverview / updateComparisonView
b1 = sub(b1, 'updateAnalysisOverview();', 'window.updateAnalysisOverview();')
b1 = sub(b1, 'updateComparisonView();', 'window.updateComparisonView();')

# 15. updateLegendCategories (called from updateAll) → internal (same module)
# It will be in cardNavigation.js so we need window.updateLegendCategories
b1 = sub(b1, '    updateLegendCategories();', '    window.updateLegendCategories();')

# 16. personDimensions / mobilePersonDimensions
b1 = sub(b1, 'if (typeof personDimensions !== \'undefined\' && personDimensions.partner)', 'if (typeof window.personDimensions !== \'undefined\' && window.personDimensions.partner)')
b1 = sub(b1, 'if (typeof personDimensions !== \'undefined\' && personDimensions.ich)', 'if (typeof window.personDimensions !== \'undefined\' && window.personDimensions.ich)')
b1 = sub(b1, 'personDimensions.partner.geschlecht = null;', 'window.personDimensions.partner.geschlecht = null;')
b1 = sub(b1, 'personDimensions.partner.orientierung = null;', 'window.personDimensions.partner.orientierung = null;')
b1 = sub(b1, 'personDimensions.partner.dominanz = null;', 'window.personDimensions.partner.dominanz = null;')
b1 = sub(b1, 'personDimensions.partner.gfk = null;', 'window.personDimensions.partner.gfk = null;')
b1 = sub(b1, 'personDimensions.ich.gfk = null;', 'window.personDimensions.ich.gfk = null;')
b1 = sub(b1, 'personDimensions.partner.geschlecht_extras = {', 'window.personDimensions.partner.geschlecht_extras = {')

b1 = sub(b1, 'if (typeof mobilePersonDimensions !== \'undefined\' && mobilePersonDimensions.partner)', 'if (typeof window.mobilePersonDimensions !== \'undefined\' && window.mobilePersonDimensions.partner)')
b1 = sub(b1, 'if (typeof mobilePersonDimensions !== \'undefined\' && mobilePersonDimensions.ich)', 'if (typeof window.mobilePersonDimensions !== \'undefined\' && window.mobilePersonDimensions.ich)')
b1 = sub(b1, 'mobilePersonDimensions.partner.geschlecht = null;', 'window.mobilePersonDimensions.partner.geschlecht = null;')
b1 = sub(b1, 'mobilePersonDimensions.partner.orientierung = null;', 'window.mobilePersonDimensions.partner.orientierung = null;')
b1 = sub(b1, 'mobilePersonDimensions.partner.dominanz = null;', 'window.mobilePersonDimensions.partner.dominanz = null;')
b1 = sub(b1, 'mobilePersonDimensions.partner.gfk = null;', 'window.mobilePersonDimensions.partner.gfk = null;')
b1 = sub(b1, 'mobilePersonDimensions.ich.gfk = null;', 'window.mobilePersonDimensions.ich.gfk = null;')
b1 = sub(b1, 'mobilePersonDimensions.partner.geschlecht_extras = {', 'window.mobilePersonDimensions.partner.geschlecht_extras = {')

# 17. selectedPartner writes in resetPartnerGOD
b1 = sub(b1, '    selectedPartner = null;\n    mobilePartnerArchetype = null;', '    window.setPartnerArchetype(null);')

# 18. geschlechtExtrasCache
b1 = sub(b1, 'if (typeof geschlechtExtrasCache !== \'undefined\' && geschlechtExtrasCache.partner)', 'if (typeof window.geschlechtExtrasCache !== \'undefined\' && window.geschlechtExtrasCache.partner)')
b1 = sub(b1, 'geschlechtExtrasCache.partner = { fit: false, fuckedup: false, horny: false, fresh: false };', 'window.geschlechtExtrasCache.partner = { fit: false, fuckedup: false, horny: false, fresh: false };')

# 19. syncGfkUI
b1 = sub(b1, "if (typeof syncGfkUI === 'function') {", "if (typeof window.syncGfkUI === 'function') {")
b1 = sub(b1, "syncGfkUI('ich');", "window.syncGfkUI('ich');")
b1 = sub(b1, "syncGfkUI('partner');", "window.syncGfkUI('partner');")

# 20. stopLightbulbBlink in resetPartnerGOD → window.stopLightbulbBlink
b1 = sub(b1, "if (typeof stopLightbulbBlink === 'function') {\n        stopLightbulbBlink();", "if (typeof window.stopLightbulbBlink === 'function') {\n        window.stopLightbulbBlink();")

# 21. updateRFactorDisplay in resetPartnerGOD → window.*
b1 = sub(b1, "if (typeof updateRFactorDisplay === 'function') {\n        updateRFactorDisplay();", "if (typeof window.updateRFactorDisplay === 'function') {\n        window.updateRFactorDisplay();")

# 22. updateComparisonView guard in resetPartnerGOD → window.*
b1 = sub(b1, "if (typeof updateComparisonView === 'function') {\n        updateComparisonView();", "if (typeof window.updateComparisonView === 'function') {\n        window.updateComparisonView();")

# 23. icons[currentArchetype] → window.icons[...] (already done above via myTypeIcon line)
# But ensure remaining icons[ references
b1 = sub(b1, 'icons[', 'window.icons[')

# 24. archetypeOrder → window.archetypeOrder (except the const declaration line itself)
# The const archetypeOrder and window.archetypeOrder = archetypeOrder lines stay as-is in the module
# Uses of archetypeOrder in functions:
b1 = sub(b1, 'const allPartners = archetypeOrder', 'const allPartners = window.archetypeOrder')
b1 = sub(b1, 'const others = archetypeOrder;', 'const others = window.archetypeOrder;')

module1 = b1

# ════════════════════════════════════════════════════════════════════════════════
# MODULE 2: scoreDisplay.js
# ════════════════════════════════════════════════════════════════════════════════
b2 = block2

# 1. lastGfkMatchingResult
b2 = sub(b2,
    'const needsScore = lastGfkMatchingResult ? lastGfkMatchingResult.score : 0;',
    'const matching2 = (window.TiageGfkMatching && window.TiageGfkMatching.getLastMatchingResult) ? window.TiageGfkMatching.getLastMatchingResult() : null;\n                    const needsScore = matching2 ? matching2.score : 0;'
)

# 2. getScoreGradientColor: keep as local alias — already present in block2 via var alias
# (The block starts at line 956; the alias var getScoreGradientColor is at line 764 in app-main,
#  so it's NOT in block2. We must add it.)

# 3. Collapsible stub lines 1070-1072 are already in block2; they're comments, leave as-is

# 4. mobileIchArchetype → window.getIchArchetype()
b2 = sub(b2, 'const ich = mobileIchArchetype;', 'const ich = window.getIchArchetype();')

# 5. mobilePartnerArchetype → window.getPartnerArchetype()
b2 = sub(b2, 'const partner = mobilePartnerArchetype;', 'const partner = window.getPartnerArchetype();')

# 6. personDimensions
b2 = sub(b2, 'const dimensions = personDimensions;', 'const dimensions = window.personDimensions;')

# 7. factorExplanations
b2 = sub(b2, 'if (typeof factorExplanations === \'undefined\') return;', 'if (typeof window.factorExplanations === \'undefined\') return;')
b2 = sub(b2, 'const factor = factorExplanations[factorType];', 'const factor = window.factorExplanations[factorType];')

# 8. selectedPartner in updateRFactorDisplay
b2 = sub(b2, 'const partnerArchetype = selectedPartner || null;', 'const partnerArchetype = window.getPartnerArchetype() || null;')

# 9. currentArchetype in updateRFactorDisplay
b2 = sub(b2,
    'const ichArchetype = currentArchetype || (typeof TiageState !== \'undefined\' ? TiageState.get(\'archetypes.ich.primary\') : null);',
    'const ichArchetype = window.getIchArchetype() || (typeof TiageState !== \'undefined\' ? TiageState.get(\'archetypes.ich.primary\') : null);'
)

# 10. getScoreGradientColor — we add the alias at top of module (see IIFE wrapper below)

module2 = b2

# ════════════════════════════════════════════════════════════════════════════════
# MODULE 3: cardNavigation.js
# ════════════════════════════════════════════════════════════════════════════════
b3 = block3

# 1. data.*
b3 = sub(b3, 'const interaction = data.interactions[interactionKey] || {};', 'const interaction = (window.tiageData.interactions[interactionKey]) || {};')
b3 = sub(b3, 'const myArch = data.archetypes[currentArchetype];', 'const myArch = window.tiageData.archetypes[window.getIchArchetype()];')
b3 = sub(b3, 'const partnerArch = data.archetypes[selectedPartner];', 'const partnerArch = window.tiageData.archetypes[window.getPartnerArchetype()];')

# 2. interactionKey
b3 = sub(b3,
    'const interactionKey = `${currentArchetype}_${selectedPartner}`;',
    'const interactionKey = `${window.getIchArchetype()}_${window.getPartnerArchetype()}`;'
)

# 3. currentArchetype references in text/expressions
b3 = sub(b3,
    'const myName = myArch?.name || currentArchetype;',
    'const myName = myArch?.name || window.getIchArchetype();'
)
b3 = sub(b3,
    'const headerText = currentArchetype === selectedPartner',
    'const headerText = window.getIchArchetype() === window.getPartnerArchetype()'
)

# 4. selectedPartner references
b3 = sub(b3,
    'const partnerName = partnerArch?.name || selectedPartner;',
    'const partnerName = partnerArch?.name || window.getPartnerArchetype();'
)

# 5. categoryDescriptions / categoryNames
b3 = sub(b3, 'const catData = categoryDescriptions[cat] || {};', 'const catData = window.categoryDescriptions[cat] || {};')
b3 = sub(b3, "const name = catData.name || categoryNames[cat] || cat;", "const name = catData.name || window.categoryNames[cat] || cat;")

# 6. getScoreColor — add alias at top of module
b3 = sub(b3, 'const scoreColor = getScoreColor(value);', 'const scoreColor = TiageChartUtils.getScoreColor(value);')

module3 = b3

# ════════════════════════════════════════════════════════════════════════════════
# Wrap modules in IIFE and write files
# ════════════════════════════════════════════════════════════════════════════════

module1_content = '''\
// ═══════════════════════════════════════════════════════════════════════════════
// js/ui/updateRendering.js
// Extracted from app-main.js
// Contains: updateAll, updateTheme, updateMyType, updatePartnerSelector,
//           selectPartner, updateTopAndChallenge, updatePartnerView,
//           updateCategoryBars, resetPartnerGOD
// ═══════════════════════════════════════════════════════════════════════════════

(function() {
    'use strict';

    // Aliases for chart utilities
    var drawRadarChart = TiageChartUtils.drawRadarChart;
    var getScoreColor = TiageChartUtils.getScoreColor;
    var getScoreGradientColor = TiageChartUtils.getScoreGradientColor;

    // Module-level state
    let currentTopMatch = { id: null, score: 0 };
    let currentChallenge = { id: null, score: 0 };

''' + module1 + '''

    // ── Exports ──────────────────────────────────────────────────────────────
    window.updateAll = updateAll;
    window.updateTheme = updateTheme;
    window.updateMyType = updateMyType;
    window.updatePartnerSelector = updatePartnerSelector;
    window.selectPartner = selectPartner;
    window.updateTopAndChallenge = updateTopAndChallenge;
    window.updatePartnerView = updatePartnerView;
    window.updateCategoryBars = updateCategoryBars;
    window.resetPartnerGOD = resetPartnerGOD;

})();
'''

module2_content = '''\
// ═══════════════════════════════════════════════════════════════════════════════
// js/ui/scoreDisplay.js
// Extracted from app-main.js
// Contains: updateSyntheseScoreCycle, triggerLightbulbBlink, stopLightbulbBlink,
//           updateDesktopFactorContent, updateRFactorDisplay
// ═══════════════════════════════════════════════════════════════════════════════

(function() {
    'use strict';

    // Aliases for chart utilities
    var getScoreGradientColor = TiageChartUtils.getScoreGradientColor;
    var getBarClass = TiageChartUtils.getBarClass;

''' + module2 + '''

    // ── Exports ──────────────────────────────────────────────────────────────
    window.updateSyntheseScoreCycle = updateSyntheseScoreCycle;
    window.triggerLightbulbBlink = triggerLightbulbBlink;
    window.stopLightbulbBlink = stopLightbulbBlink;
    window.updateDesktopFactorContent = updateDesktopFactorContent;
    window.updateRFactorDisplay = updateRFactorDisplay;

})();
'''

module3_content = '''\
// ═══════════════════════════════════════════════════════════════════════════════
// js/ui/cardNavigation.js
// Extracted from app-main.js
// Contains: scrollToCard, updateNavDots, navigatePrev, navigateNext,
//           updateLegendCategories
// ═══════════════════════════════════════════════════════════════════════════════

(function() {
    'use strict';

''' + module3 + '''

    // ── Exports ──────────────────────────────────────────────────────────────
    window.scrollToCard = scrollToCard;
    window.updateNavDots = updateNavDots;
    window.navigatePrev = navigatePrev;
    window.navigateNext = navigateNext;
    window.updateLegendCategories = updateLegendCategories;

})();
'''

# Write modules
os.makedirs(os.path.join(BASE, 'js', 'ui'), exist_ok=True)

with open(os.path.join(BASE, 'js', 'ui', 'updateRendering.js'), 'w', encoding='utf-8') as f:
    f.write(module1_content)

with open(os.path.join(BASE, 'js', 'ui', 'scoreDisplay.js'), 'w', encoding='utf-8') as f:
    f.write(module2_content)

with open(os.path.join(BASE, 'js', 'ui', 'cardNavigation.js'), 'w', encoding='utf-8') as f:
    f.write(module3_content)

print('Modules written.')

# ════════════════════════════════════════════════════════════════════════════════
# Patch app-main.js — replace blocks back-to-front to preserve indices
# ════════════════════════════════════════════════════════════════════════════════

# Reload fresh copy
with open(os.path.join(BASE, 'js', 'app-main.js'), 'r', encoding='utf-8') as f:
    lines = f.readlines()

# --- Block 3 replacement: lines 1226-1317 (0-indexed 1225:1317) ---
stub3 = (
    '        // ═══════════════════════════════════════════════════════════════════════════\n'
    '        // CARD NAVIGATION — Moved to js/ui/cardNavigation.js\n'
    '        // Functions available via window.*:\n'
    '        // - scrollToCard, updateNavDots, navigatePrev, navigateNext, updateLegendCategories\n'
    '        // ═══════════════════════════════════════════════════════════════════════════\n'
)
lines[1225:1317] = [stub3]

# --- Block 2 replacement: lines 956-1224 (0-indexed 955:1224) ---
stub2 = (
    '        // ═══════════════════════════════════════════════════════════════════════════\n'
    '        // SCORE DISPLAY — Moved to js/ui/scoreDisplay.js\n'
    '        // Functions available via window.*:\n'
    '        // - updateSyntheseScoreCycle, triggerLightbulbBlink, stopLightbulbBlink\n'
    '        // - updateDesktopFactorContent, updateRFactorDisplay\n'
    '        // ═══════════════════════════════════════════════════════════════════════════\n'
)
lines[955:1224] = [stub2]

# --- Block 1 replacement: lines 541-952 (0-indexed 540:952) ---
stub1 = (
    '        // ═══════════════════════════════════════════════════════════════════════════\n'
    '        // UPDATE RENDERING — Moved to js/ui/updateRendering.js\n'
    '        // Functions available via window.*:\n'
    '        // - updateAll, updateTheme, updateMyType, updatePartnerSelector\n'
    '        // - selectPartner, updateTopAndChallenge, updatePartnerView\n'
    '        // - updateCategoryBars, resetPartnerGOD\n'
    '        // ═══════════════════════════════════════════════════════════════════════════\n'
)
lines[540:952] = [stub1]

# ── Now patch the stale export lines (by text search, not line number) ─────────
new_lines = []
skip_patterns = [
    '        window.resetPartnerGOD = resetPartnerGOD;\n',
    '        window.updateSyntheseScoreCycle = updateSyntheseScoreCycle;\n',
    '        window.updateRFactorDisplay = updateRFactorDisplay;\n',
    '        window.updateDesktopFactorContent = updateDesktopFactorContent;\n',
    '        window.scrollToCard = scrollToCard;\n',
    '        window.navigatePrev = navigatePrev;\n',
    '        window.navigateNext = navigateNext;\n',
    '        window.updateAll = updateAll;\n',
    '        window.selectPartner = selectPartner;\n',
]
note_map = {
    '        window.resetPartnerGOD = resetPartnerGOD;\n':           '        // NOTE: resetPartnerGOD -> js/ui/updateRendering.js\n',
    '        window.updateSyntheseScoreCycle = updateSyntheseScoreCycle;\n': '        // NOTE: updateSyntheseScoreCycle -> js/ui/scoreDisplay.js\n',
    '        window.updateRFactorDisplay = updateRFactorDisplay;\n':  '        // NOTE: updateRFactorDisplay -> js/ui/scoreDisplay.js\n',
    '        window.updateDesktopFactorContent = updateDesktopFactorContent;\n': '        // NOTE: updateDesktopFactorContent -> js/ui/scoreDisplay.js\n',
    '        window.scrollToCard = scrollToCard;\n':                  '        // NOTE: scrollToCard -> js/ui/cardNavigation.js\n',
    '        window.navigatePrev = navigatePrev;\n':                  '        // NOTE: navigatePrev -> js/ui/cardNavigation.js\n',
    '        window.navigateNext = navigateNext;\n':                  '        // NOTE: navigateNext -> js/ui/cardNavigation.js\n',
    '        window.updateAll = updateAll;\n':                        '        // NOTE: updateAll -> js/ui/updateRendering.js\n',
    '        window.selectPartner = selectPartner;\n':                '        // NOTE: selectPartner -> js/ui/updateRendering.js\n',
}

for line in lines:
    if line in note_map:
        new_lines.append(note_map[line])
    else:
        new_lines.append(line)

with open(os.path.join(BASE, 'js', 'app-main.js'), 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print('app-main.js patched.')
print('Done.')
