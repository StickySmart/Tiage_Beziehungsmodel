/**
 * TIAGE Tag Tooltip Handler
 * Extracted from app-main.js
 *
 * Provides getTagTooltip and generateFallbackTooltip for tag-level tooltip content.
 *
 * Dependencies:
 *   - TiageTagTooltips (js/core/tagTooltips.js)
 *   - TiageArchetypeDescriptions (js/core/archetypeDescriptions.js)
 *   - window.tiageData (set by loadData in app-main.js)
 *   - window.archetypeDescriptions (set by app-main.js)
 */

var tagTooltipContent = TiageTagTooltips.tagTooltipContent;
var normalizeTagName = TiageTagTooltips.normalizeTagName;

// Get tooltip content for a specific tag
function getTagTooltip(type1Id, type2Id, category, tagName) {
    const normalizedTag = normalizeTagName(tagName);

    // Sort type IDs alphabetically for consistent key lookup
    const sortedTypes = [type1Id, type2Id].sort();
    const comboKey = sortedTypes.join('-');

    // Try to find specific tooltip
    const comboData = tagTooltipContent[comboKey];
    if (comboData && comboData[category] && comboData[category][normalizedTag]) {
        const tooltip = comboData[category][normalizedTag];
        const type1 = window.tiageData.archetypes[type1Id];
        const type2 = window.tiageData.archetypes[type2Id];

        // Swap perspectives if types were reordered
        if (sortedTypes[0] === type2Id) {
            return {
                type1Name: type1?.name || type1Id,
                type2Name: type2?.name || type2Id,
                type1Perspective: tooltip.type2Perspective,
                type2Perspective: tooltip.type1Perspective,
                dynamic: tooltip.dynamic
            };
        }

        return {
            type1Name: type1?.name || type1Id,
            type2Name: type2?.name || type2Id,
            type1Perspective: tooltip.type1Perspective,
            type2Perspective: tooltip.type2Perspective,
            dynamic: tooltip.dynamic
        };
    }

    // Fallback: Generate generic tooltip
    return generateFallbackTooltip(type1Id, type2Id, category, tagName);
}

// Generate fallback tooltip when no specific content exists
function generateFallbackTooltip(type1Id, type2Id, category, tagName) {
    const type1 = window.tiageData.archetypes[type1Id];
    const type2 = window.tiageData.archetypes[type2Id];
    const type1Def = window.archetypeDescriptions[type1Id];
    const type2Def = window.archetypeDescriptions[type2Id];

    const interactionKey = `${type1Id}_${type2Id}`;
    const interaction = window.tiageData.interactions[interactionKey] || {};
    const scores = interaction.scores || {};
    const catScore = scores[category]?.value || 50;

    // Generate context-aware fallback
    let dynamicText = '';
    if (catScore >= 85) {
        dynamicText = `Hohe Übereinstimmung (${catScore}) in diesem Bereich - beide Typen haben ähnliche Ansätze.`;
    } else if (catScore >= 70) {
        dynamicText = `Moderate Übereinstimmung (${catScore}) - einige gemeinsame Grundlagen, aber auch Unterschiede.`;
    } else if (catScore >= 50) {
        dynamicText = `Mittlere Beziehungsqualität (${catScore}) - deutliche Unterschiede, die Kompromisse erfordern.`;
    } else {
        dynamicText = `Herausfordernde Konstellation (${catScore}) - grundlegend verschiedene Ansätze in diesem Bereich.`;
    }

    return {
        type1Name: type1?.name || type1Id,
        type2Name: type2?.name || type2Id,
        type1Perspective: type1Def?.keyPrinciples?.[0] || `${type1?.name || type1Id} hat eigene Präferenzen in diesem Bereich.`,
        type2Perspective: type2Def?.keyPrinciples?.[0] || `${type2?.name || type2Id} hat eigene Präferenzen in diesem Bereich.`,
        dynamic: dynamicText
    };
}

window.getTagTooltip = getTagTooltip;
window.generateFallbackTooltip = generateFallbackTooltip;
