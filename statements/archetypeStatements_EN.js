/**
 * ARCHETYPE MICRO-STATEMENTS DATABASE (ENGLISH)
 * ==============================================
 * ~650 philosophical micro-statements for archetype combinations
 *
 * Philosophical Foundation:
 * - Robert Pirsig: Metaphysics of Quality (MOQ) - Static vs. Dynamic Quality
 * - OSHO: Polarity and opposites as a source of attraction
 *
 * Structure:
 * - Each combination has pathos (emotional level) and logos (rational level) statements
 * - Pro/Contra are based on the combination of archetypes
 * - Weighting: Pathos 75%, Logos 25%
 */

const archetypeStatements_EN = {
    // ═══════════════════════════════════════════════════════════════════════
    // SINGLE (from) - 8 Combinations
    // ═══════════════════════════════════════════════════════════════════════

    "single_single": {
        pathos: {
            gemeinsam: [
                "Two souls speaking the same language of freedom.",
                "Mutual recognition of independence creates respect, but no natural attraction.",
                "Both understand the need for space – perhaps too well.",
                "The emptiness between them is not distance, but shared understanding."
            ],
            spannung: [
                "Without polarity, the magnetic force of attraction is missing.",
                "Two equals can respect each other, but rarely truly yearn for one another.",
                "Freedom becomes a prison when no one is there to challenge it."
            ]
        },
        logos: {
            gemeinsam: [
                "Structurally identical: Both prioritize autonomy over connection.",
                "No fundamental conflicts, as there are no fundamental expectations.",
                "Rationality meets rationality – little friction, little fire.",
                "The relationship philosophies are congruent."
            ],
            unterschied: [
                "Individual differences in life phases may vary.",
                "Individual needs determine whether closeness is sought or avoided."
            ]
        },
        pro: [
            "Identical relationship philosophy – no explanation needed",
            "Mutual respect for autonomy is self-evident",
            "No unfulfillable expectations of each other",
            "Freedom for spontaneous decisions remains intact",
            "No pressure to escalate the relationship",
            "Both understand the need for retreat"
        ],
        contra: [
            "Lack of polarity can lead to lack of attraction",
            "Neither gives the impulse for deepening",
            "No mutual social support",
            "Risk of eternal non-commitment",
            "Both wait for the other to make the first move",
            "No shared vision for the future"
        ]
    },

    "single_duo": {
        pathos: {
            gemeinsam: [
                "The Single feels the warmth of security that the Duo offers.",
                "A deep longing can arise – for what one consciously avoids.",
                "The Duo embodies what the Single sometimes misses: arriving."
            ],
            spannung: [
                "The fear of being consumed meets the need for merging.",
                "The Single feels confined where the Duo seeks closeness.",
                "The drive for freedom collides with the expectation of exclusivity.",
                "What is protection for one is a wall for the other."
            ]
        },
        logos: {
            gemeinsam: [
                "Both know clear relationship models – even if they are opposite.",
                "Structure meets structure, just with different content."
            ],
            unterschied: [
                "Fundamental conflict: Independence vs. Exclusivity",
                "Single sees relationship as an option, Duo as a necessity",
                "Time allocation is radically differently conceived",
                "Future planning diverges fundamentally"
            ]
        },
        pro: [
            "Duo offers stability that the Single sometimes misses",
            "Single can learn from Duo's ability to bond",
            "Clear expectations on Duo's side prevent misunderstandings",
            "Potential for transformative relationship experience"
        ],
        contra: [
            "Fundamental conflict: Freedom vs. Exclusivity",
            "Single quickly feels confined",
            "Duo feels not prioritized",
            "Different expectations of time and presence",
            "Social pressure from Duo's environment",
            "Single can be perceived as a 'project'",
            "Duo can be experienced as 'clingy'",
            "No shared relationship vision possible"
        ]
    },

    "single_duo_flex": {
        pathos: {
            gemeinsam: [
                "Duo-Flex understands the longing for freedom – at least partially.",
                "The Single recognizes in Duo-Flex a compromise that could build bridges.",
                "Both share the feeling that relationships don't have to be everything."
            ],
            spannung: [
                "The 'Flex' component is often not enough for the Single.",
                "Single can feel like 'the outsider' of the primary relationship.",
                "The implicit hierarchy violates the sense of equality."
            ]
        },
        logos: {
            gemeinsam: [
                "Duo-Flex shows openness to alternative models.",
                "Structurally there are connection points through flexibility."
            ],
            unterschied: [
                "Single doesn't want hierarchy, Duo-Flex has one built in.",
                "The 'primary relationship' of Duo-Flex always comes first.",
                "Single is a guest, not an equal partner."
            ]
        },
        pro: [
            "Duo-Flex can offer the Single situational closeness",
            "Openness to alternative encounters exists",
            "No expectation of complete commitment",
            "Potential for fulfilling partial relationship",
            "Shared acceptance of flexibility"
        ],
        contra: [
            "Single is structurally 'second choice'",
            "Primary relationship always takes precedence",
            "Single might feel 'used'",
            "No development to equality possible",
            "Duo-Flex rules can restrict the Single",
            "Emotional asymmetry is structurally anchored"
        ]
    },

    "single_solopoly": {
        pathos: {
            gemeinsam: [
                "A deep resonance on the level of autonomy.",
                "Both value freedom as the highest value – this connects.",
                "The Single recognizes in Solopoly a kindred spirit of independence.",
                "Respect for one's own space is self-evident."
            ],
            spannung: [
                "Solopoly is actively connected, Single often is not.",
                "Solopoly's activity can overwhelm the Single.",
                "Single can lose themselves in non-exclusivity."
            ]
        },
        logos: {
            gemeinsam: [
                "Both reject traditional relationship models.",
                "Autonomy is the common foundation.",
                "No expectation of merging or living together."
            ],
            unterschied: [
                "Solopoly has multiple relationships, Single often none.",
                "The capacity for relationship work differs.",
                "Solopoly expects relationship, Single not necessarily."
            ]
        },
        pro: [
            "Maximum alignment in autonomy needs",
            "Mutual respect for independence",
            "No hierarchy issues",
            "Relationship as enrichment, not obligation",
            "Solopoly can inspire the Single",
            "Honest communication about needs"
        ],
        contra: [
            "Single might be overwhelmed by Solopoly's activity",
            "Solopoly expects relationship work that Single wants to avoid",
            "Solopoly's many contacts can be intimidating",
            "Single might feel like 'one of many'"
        ]
    },

    "single_polyamor": {
        pathos: {
            gemeinsam: [
                "Single feels the warmth of the polyamorous community.",
                "Polyamor's openness can seem inviting."
            ],
            spannung: [
                "The structured complexity overwhelms the Single.",
                "Polyamor expects active participation, Single wants peace.",
                "Polyamor's calendar marathon contradicts Single's rhythm."
            ]
        },
        logos: {
            gemeinsam: [
                "Both reflect on relationship models."
            ],
            unterschied: [
                "Polyamor is highly structured, Single seeks simplicity.",
                "Communication intensity is radically different.",
                "Polyamor needs active relationship work, Single avoids it."
            ]
        },
        pro: [
            "Polyamor can offer Single structure without exclusivity",
            "No '100% expectation' on the Single",
            "Community aspect can be enriching",
            "Honest communication is practiced"
        ],
        contra: [
            "High communication effort overwhelms the Single",
            "Polyamor's structure contradicts Single's simplicity",
            "Single feels lost in the complexity",
            "Calendar management is unattractive for Single",
            "Hierarchies can frustrate the Single"
        ]
    },

    "single_ra": {
        pathos: {
            gemeinsam: [
                "Both value freedom and reject predetermined labels.",
                "No societal expectations burden the encounter."
            ],
            spannung: [
                "RA's radical label rejection can confuse Single.",
                "Single might prefer clear categories."
            ]
        },
        logos: {
            gemeinsam: [
                "Both are autonomous and self-determined."
            ],
            unterschied: [
                "RA has a conscious philosophy, Single is pragmatically unattached."
            ]
        },
        pro: [
            "Maximum freedom on both sides",
            "No labels or expectations",
            "Individual agreements possible"
        ],
        contra: [
            "Can be confusing without clear structures",
            "Socially hard to explain"
        ]
    },

    "single_lat": {
        pathos: {
            gemeinsam: [
                "Both value their own space and independence.",
                "No pressure to live together."
            ],
            spannung: [
                "LAT expects more commitment than Single is used to."
            ]
        },
        logos: {
            gemeinsam: [
                "Both live alone and appreciate it."
            ],
            unterschied: [
                "LAT is in a relationship, Single is not."
            ]
        },
        pro: [
            "Own space remains preserved",
            "Good transition to relationship",
            "No merging expectation"
        ],
        contra: [
            "LAT expects commitment",
            "Single might not be ready"
        ]
    },

    "single_aromantisch": {
        pathos: {
            gemeinsam: [
                "Both have no romantic expectations.",
                "Deep platonic connection is possible."
            ],
            spannung: [
                "Single might be seeking romance."
            ]
        },
        logos: {
            gemeinsam: [
                "Both are autonomous."
            ],
            unterschied: [
                "Single is open to romance, Aromantic is not."
            ]
        },
        pro: [
            "No romantic expectations",
            "Platonic depth possible",
            "Autonomy is respected"
        ],
        contra: [
            "Single might be seeking romance",
            "Different relationship goals"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // DUO (from) - 8 Combinations
    // ═══════════════════════════════════════════════════════════════════════

    "duo_single": {
        pathos: {
            gemeinsam: [
                "The Duo longs for the freedom that the Single embodies.",
                "A secret fascination with the untamed."
            ],
            spannung: [
                "The fear of not being enough for someone who can have everything.",
                "Duo feels inferior to Single's freedom.",
                "The desire for exclusivity meets walls.",
                "Declarations of love fall into the void of non-commitment."
            ]
        },
        logos: {
            unterschied: [
                "Fundamental incompatibility of relationship models.",
                "Duo needs commitment, Single avoids it.",
                "Future planning is one-sided – Duo plans, Single evades."
            ]
        },
        pro: [
            "Single can find Duo's intensity inspiring",
            "Potential for transformative experience on both sides",
            "Duo can learn to cling less"
        ],
        contra: [
            "Duo invests emotionally more than returns",
            "Single doesn't reciprocate the exclusivity",
            "Duo feels not chosen, only tolerated",
            "One-sided emotional labor",
            "Duo carries the burden of relationship work alone",
            "Single can perceive Duo as 'too much'",
            "Heartbreak for Duo is pre-programmed"
        ]
    },

    "duo_duo": {
        pathos: {
            gemeinsam: [
                "Two souls seeking the same thing: arriving, merging, home.",
                "Mutual devotion creates deep resonance.",
                "Exclusivity as a shared language of love.",
                "The feeling: 'You are my home' – mutual."
            ],
            spannung: [
                "High expectations can lead to high pressure.",
                "When both expect everything from each other, one can never be enough."
            ]
        },
        logos: {
            gemeinsam: [
                "Structurally perfectly aligned: Clear roles, clear expectations.",
                "Maximally supported by society.",
                "Legal and institutional security possible.",
                "Shared life planning is self-evident."
            ],
            unterschied: [
                "Individual differences in closeness-distance may vary."
            ]
        },
        pro: [
            "Identical relationship philosophy – deep resonance",
            "Maximum social acceptance",
            "Clear, shared expectations of fidelity and exclusivity",
            "Shared life planning possible",
            "Mutual full emotional availability",
            "Legal security (marriage etc.) possible",
            "Family and friends understand the relationship"
        ],
        contra: [
            "High expectations can lead to high pressure",
            "Danger of merging and identity loss",
            "One person must fulfill all needs",
            "Little room for individual development",
            "Separation is experienced as failure"
        ]
    },

    "duo_duo_flex": {
        pathos: {
            gemeinsam: [
                "The Duo recognizes in Duo-Flex a close relative.",
                "The basic values of stability and primary relationship are similar."
            ],
            spannung: [
                "The 'Flex' component unsettles the Duo.",
                "Duo fears: 'Am I not enough?'",
                "The opening is perceived as a threat.",
                "Jealousy is pre-programmed."
            ]
        },
        logos: {
            gemeinsam: [
                "Both prioritize a primary relationship.",
                "Structure and stability are shared values."
            ],
            unterschied: [
                "The 'Flex' option is a no-go for Duo.",
                "Definition of fidelity differs fundamentally."
            ]
        },
        pro: [
            "Basic understanding for primary relationship priority",
            "Similar ideas of stability",
            "Duo-Flex might return to monogamy"
        ],
        contra: [
            "Duo experiences the 'Flex' opening as betrayal",
            "Different fidelity definitions",
            "Jealousy and insecurity on Duo's side",
            "Duo fears not being enough",
            "The opening is unbearable for Duo",
            "Fundamental conflict with exclusivity"
        ]
    },

    "duo_solopoly": {
        pathos: {
            spannung: [
                "The Duo feels like an option, not a priority.",
                "The non-hierarchy violates the need for special status.",
                "Duo doesn't understand why they can't be 'the one'.",
                "Deep insecurity from the equality of other relationships."
            ]
        },
        logos: {
            unterschied: [
                "Fundamental incompatibility: Exclusivity vs. Equality.",
                "Duo wants to merge, Solopoly wants to maintain distance.",
                "Living together is excluded for Solopoly – essential for Duo."
            ]
        },
        pro: [
            "Solopoly offers clear communication",
            "Both can learn a lot from each other"
        ],
        contra: [
            "Duo feels like 'one of many'",
            "No special status for Duo possible",
            "Solopoly rejects merging, Duo needs it",
            "No living together possible",
            "Duo experiences Solopoly's autonomy as rejection",
            "Fundamental value conflict",
            "Duo will always want more than Solopoly can give"
        ]
    },

    "duo_polyamor": {
        pathos: {
            gemeinsam: [
                "Both value deep emotional connections."
            ],
            spannung: [
                "Duo cannot bear the shared attention.",
                "Jealousy is inevitable.",
                "The feeling of never being enough is dominant."
            ]
        },
        logos: {
            gemeinsam: [
                "Both value communication and commitment."
            ],
            unterschied: [
                "Exclusivity vs. ethical non-exclusivity.",
                "Duo wants one relationship, Polyamor has several."
            ]
        },
        pro: [
            "Both value emotional depth",
            "Communication is important to both",
            "Polyamor could offer Duo security as Primary"
        ],
        contra: [
            "Duo experiences shared attention as betrayal",
            "Jealousy is inevitable for Duo",
            "The hierarchy doesn't comfort Duo enough",
            "Duo doesn't understand Polyamor's capacity for multiple partners",
            "Fundamental conflict with exclusivity"
        ]
    },

    "duo_ra": {
        pathos: {
            spannung: [
                "RA rejects the labels that are existential for Duo.",
                "Duo needs security through categories, RA flees them.",
                "Fundamental worldview conflict."
            ]
        },
        logos: {
            unterschied: [
                "Maximum incompatibility of relationship philosophies.",
                "RA cannot promise the exclusivity that Duo needs."
            ]
        },
        pro: [
            "RA is honest and authentic"
        ],
        contra: [
            "Fundamental incompatibility",
            "Duo needs labels, RA rejects them",
            "No common language for relationship"
        ]
    },

    "duo_lat": {
        pathos: {
            gemeinsam: [
                "Both want deep, committed relationship."
            ],
            spannung: [
                "Duo wants to live together, LAT doesn't.",
                "The living arrangement is a fundamental conflict."
            ]
        },
        logos: {
            unterschied: [
                "Fundamental difference in living arrangement.",
                "Duo sees living together as an expression of love."
            ]
        },
        pro: [
            "Both want depth and commitment",
            "Exclusivity is possible"
        ],
        contra: [
            "Living arrangement conflict is fundamental",
            "Duo might feel rejected"
        ]
    },

    "duo_aromantisch": {
        pathos: {
            spannung: [
                "Duo seeks romantic love – exactly what Aromantic cannot offer.",
                "Fundamental difference in the language of love.",
                "Duo might feel unloved."
            ]
        },
        logos: {
            unterschied: [
                "Maximum incompatibility in romantic expectations.",
                "Aromantic cannot speak the romantic language."
            ]
        },
        pro: [
            "Deep connection on another level possible"
        ],
        contra: [
            "Duo expects romance",
            "Fundamental difference",
            "Duo doesn't feel 'properly' loved"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // DUO-FLEX (from) - 8 Combinations
    // ═══════════════════════════════════════════════════════════════════════

    "duo_flex_single": {
        pathos: {
            gemeinsam: [
                "Duo-Flex recognizes in Single the drive for freedom that it knows itself.",
                "The situational opening creates connection points."
            ],
            spannung: [
                "Single might threaten Duo-Flex's primary relationship.",
                "Uncertainty: Is the Single only interested in the Flex part?"
            ]
        },
        logos: {
            gemeinsam: [
                "Both have a certain degree of flexibility."
            ],
            unterschied: [
                "Single doesn't want to be second choice.",
                "Duo-Flex must navigate boundaries that Single doesn't understand."
            ]
        },
        pro: [
            "Shared understanding of flexibility",
            "Single can offer enriching encounters",
            "No threat to primary relationship from Single"
        ],
        contra: [
            "Single might want more than Duo-Flex can give",
            "Hierarchy problem remains",
            "Single feels like a 'toy'",
            "Duo-Flex's rules can frustrate the Single"
        ]
    },

    "duo_flex_duo": {
        pathos: {
            gemeinsam: [
                "Basic understanding for the importance of a primary relationship.",
                "Both know the value of stability."
            ],
            spannung: [
                "Duo cannot accept the Flex opening.",
                "The opening is perceived as infidelity."
            ]
        },
        logos: {
            gemeinsam: [
                "Similar structures with one main relationship."
            ],
            unterschied: [
                "Definition of fidelity is different.",
                "What is 'flexibility' for Duo-Flex is 'cheating' for Duo."
            ]
        },
        pro: [
            "Shared appreciation of primary relationships",
            "Duo-Flex might become more exclusive for Duo"
        ],
        contra: [
            "Duo experiences Flex part as betrayal",
            "Different fidelity definitions",
            "Duo-Flex's openings are unacceptable for Duo",
            "Constant conflict potential"
        ]
    },

    "duo_flex_duo_flex": {
        pathos: {
            gemeinsam: [
                "Perfect resonance: Both understand the balancing act.",
                "The search for the best of both worlds connects.",
                "Mutual understanding for the model's complexity.",
                "Both know the feeling: 'Enough? Too much?'"
            ],
            spannung: [
                "Competition for Flex partners can arise.",
                "Accepting one's own opening is easier than the partner's."
            ]
        },
        logos: {
            gemeinsam: [
                "Identical structure: Primary relationship + situational opening.",
                "Common rulebook is negotiable.",
                "Both understand the concept of Primary and Flex."
            ]
        },
        pro: [
            "Identical relationship philosophy",
            "Mutual understanding for openings",
            "Common rules can be negotiated",
            "Symmetrical freedoms create balance",
            "Both know the challenges"
        ],
        contra: [
            "Jealousy can occur despite understanding",
            "Flex rules must be constantly renegotiated",
            "Asymmetry in using the opening can hurt",
            "Complexity of double flexibility"
        ]
    },

    "duo_flex_solopoly": {
        pathos: {
            gemeinsam: [
                "Both value flexibility and openness.",
                "Non-exclusivity is familiar to both."
            ],
            spannung: [
                "Solopoly rejects hierarchies, Duo-Flex is based on them.",
                "Duo-Flex wants primary status, Solopoly doesn't give it."
            ]
        },
        logos: {
            unterschied: [
                "Hierarchy vs. Equality is the core conflict.",
                "Duo-Flex's primary relationship has no equivalent in Solopoly model."
            ]
        },
        pro: [
            "Shared openness for non-exclusive relationships",
            "Both actively practice multiple relationships",
            "Communication about boundaries is familiar to both"
        ],
        contra: [
            "Solopoly doesn't give primary status",
            "Duo-Flex expects hierarchy that Solopoly rejects",
            "Different ideas of commitment",
            "Duo-Flex wants more security than Solopoly offers"
        ]
    },

    "duo_flex_polyamor": {
        pathos: {
            gemeinsam: [
                "Both know the complexity of multiple relationships.",
                "Communication and boundaries are important to both."
            ],
            spannung: [
                "Polyamor's multiple deep relationships vs. Duo-Flex's situational opening.",
                "Different depth of non-primary relationships."
            ]
        },
        logos: {
            gemeinsam: [
                "Both work with rules and agreements.",
                "Structure is important to both."
            ],
            unterschied: [
                "Polyamor's secondary relationships are deeper than Duo-Flex's flex contacts.",
                "Different expectations for non-primary connections."
            ]
        },
        pro: [
            "Shared appreciation of communication and structure",
            "Both understand non-exclusive relationships",
            "Rules and boundaries are familiar to both"
        ],
        contra: [
            "Different depth of secondary relationships",
            "Polyamor's secondaries expect more than Duo-Flex gives",
            "Complexity can overwhelm",
            "Time management is challenging"
        ]
    },

    "duo_flex_ra": {
        pathos: {
            gemeinsam: [
                "Both understand openness and alternative relationship forms."
            ],
            spannung: [
                "RA rejects the primary relationship concept that is central for Duo-Flex.",
                "Structural conflict between rules and radical freedom."
            ]
        },
        logos: {
            unterschied: [
                "Duo-Flex has primary relationship, RA rejects hierarchies.",
                "Different definitions of freedom."
            ]
        },
        pro: [
            "Both understand non-monogamous lifestyles",
            "Flexible agreements possible"
        ],
        contra: [
            "RA rejects primary relationship concept",
            "Structural conflict is fundamental"
        ]
    },

    "duo_flex_lat": {
        pathos: {
            gemeinsam: [
                "Both understand conscious distance and flexibility."
            ],
            spannung: [
                "Different expectations about living together."
            ]
        },
        logos: {
            gemeinsam: [
                "Both value balance between closeness and distance."
            ]
        },
        pro: [
            "LAT understands conscious distance",
            "Good balance possible"
        ],
        contra: [
            "Different expectations about opening",
            "LAT might expect exclusivity"
        ]
    },

    "duo_flex_aromantisch": {
        pathos: {
            spannung: [
                "Duo-Flex expects romantic primary relationship.",
                "Aromantic cannot fulfill this expectation."
            ]
        },
        logos: {
            unterschied: [
                "Romantic expectations are not fulfilled."
            ]
        },
        pro: [
            "Aromantic could fit as Flex partner"
        ],
        contra: [
            "Romantic expectations for primary partner exist",
            "Fundamental differences in romance"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SOLOPOLY (from) - 8 Combinations
    // ═══════════════════════════════════════════════════════════════════════

    "solopoly_single": {
        pathos: {
            gemeinsam: [
                "Deep kinship in autonomy needs.",
                "Both understand: 'I belong to myself.'",
                "Respect for boundaries is self-evident.",
                "The other's freedom is not questioned."
            ],
            spannung: [
                "Solopoly is connection-oriented, Single often is not.",
                "Solopoly expects relationship work that Single avoids."
            ]
        },
        logos: {
            gemeinsam: [
                "Both prioritize independence over merging.",
                "No expectation of living together."
            ],
            unterschied: [
                "Solopoly actively maintains relationships, Single not necessarily.",
                "Activity level differs."
            ]
        },
        pro: [
            "Maximum alignment in autonomy",
            "Mutual respect for independence",
            "No merging expectation",
            "Relationship as choice, not obligation",
            "Solopoly can show Single how connection without loss of freedom works"
        ],
        contra: [
            "Single might not reciprocate Solopoly's activity",
            "Asymmetric relationship readiness",
            "Solopoly expects more engagement than Single wants to give",
            "Frustration on Solopoly's side possible"
        ]
    },

    "solopoly_duo": {
        pathos: {
            spannung: [
                "Duo's exclusivity need collides with Solopoly's life model.",
                "Solopoly cannot give what Duo needs: exclusivity.",
                "Duo will always want more – more than Solopoly can structurally offer."
            ]
        },
        logos: {
            unterschied: [
                "Fundamental incompatibility of relationship models.",
                "Solopoly rejects hierarchy, Duo needs it.",
                "Living together is excluded for Solopoly."
            ]
        },
        pro: [
            "Duo could learn from Solopoly's clarity",
            "Potential for deep conversations about relationship models"
        ],
        contra: [
            "Structural incompatibility",
            "Duo expects exclusivity, Solopoly doesn't offer it",
            "No living together possible",
            "Duo will always be frustrated",
            "No shared vision for the future",
            "Heartbreak for Duo likely"
        ]
    },

    "solopoly_duo_flex": {
        pathos: {
            gemeinsam: [
                "Both know non-exclusive relationships.",
                "Openness connects."
            ],
            spannung: [
                "Duo-Flex expects hierarchy, Solopoly doesn't give one.",
                "Duo-Flex's primary relationship has no equivalent in Solopoly."
            ]
        },
        logos: {
            unterschied: [
                "Hierarchy vs. Equality.",
                "Solopoly's egalitarianism vs. Duo-Flex's primary focus."
            ]
        },
        pro: [
            "Shared experience with non-exclusive relationships",
            "Openness for conversations about boundaries",
            "Potential for enriching connection"
        ],
        contra: [
            "Duo-Flex expects special status that Solopoly doesn't give",
            "Different hierarchy understandings",
            "Solopoly cannot fulfill Duo-Flex's primary need"
        ]
    },

    "solopoly_solopoly": {
        pathos: {
            gemeinsam: [
                "Perfect mirroring: Both deeply understand what the other needs.",
                "Freedom as the highest value – shared and respected.",
                "Love as a gift, not a demand.",
                "Deep connection without merging pressure."
            ],
            spannung: [
                "Both are so autonomous that sometimes no one takes initiative.",
                "The balance between connection and distance must be consciously maintained."
            ]
        },
        logos: {
            gemeinsam: [
                "Identical relationship philosophy.",
                "Both live in separate apartments – no conflict.",
                "No hierarchy discussions needed.",
                "Time management is familiar to both."
            ]
        },
        pro: [
            "Maximum philosophical alignment",
            "Mutual respect for autonomy is deeply anchored",
            "No hierarchy conflicts",
            "Relationship from pure choice, not dependency",
            "Both understand the model's challenges",
            "No pressure to live together"
        ],
        contra: [
            "Sometimes initiative for deepening is missing",
            "Too much distance possible",
            "Coordination with other partners on both sides can be complex",
            "Risk of 'living side by side'"
        ]
    },

    "solopoly_polyamor": {
        pathos: {
            gemeinsam: [
                "Both share polyamorous values: Honesty, communication, consent.",
                "Deep connections with multiple people are familiar to both."
            ],
            spannung: [
                "Solopoly rejects merging, Polyamor sometimes practices it.",
                "The intensity of Polyamor's primary relationships can irritate Solopoly."
            ]
        },
        logos: {
            gemeinsam: [
                "Both consciously reflect on their relationship form.",
                "Communication is central."
            ],
            unterschied: [
                "Solopoly rejects hierarchies, Polyamor often has Primary/Secondary.",
                "Different structures despite similar values."
            ]
        },
        pro: [
            "Shared polyamorous core values",
            "High communication competence on both sides",
            "Mutual understanding for non-monogamous lifestyles",
            "Potential for deep, ethical connection"
        ],
        contra: [
            "Hierarchy differences can create conflicts",
            "Solopoly doesn't want to be or give Primary position",
            "Different expectations of structure",
            "Polyamor's calendar management can restrict Solopoly's spontaneity"
        ]
    },

    "solopoly_ra": {
        pathos: {
            gemeinsam: [
                "Both maximize autonomy and reject hierarchies.",
                "No primary relationship expectations."
            ],
            spannung: [
                "RA is even less structured than Solopoly."
            ]
        },
        logos: {
            gemeinsam: [
                "Both value autonomy as the highest value."
            ],
            unterschied: [
                "Solopoly is more structured than RA."
            ]
        },
        pro: [
            "Both value autonomy maximally",
            "No hierarchy expectations",
            "Philosophical kinship"
        ],
        contra: [
            "RA even less structured than Solopoly",
            "Can become too formless"
        ]
    },

    "solopoly_lat": {
        pathos: {
            gemeinsam: [
                "Both live separately and value autonomy.",
                "No living-together conflict."
            ],
            spannung: [
                "LAT might expect more exclusivity."
            ]
        },
        logos: {
            gemeinsam: [
                "Both understand separate living as a value."
            ],
            unterschied: [
                "Solopoly has multiple partners, LAT often only one."
            ]
        },
        pro: [
            "LAT understands separate living",
            "Autonomy compatibility"
        ],
        contra: [
            "LAT might want more exclusivity",
            "Different expectations about number of partners"
        ]
    },

    "solopoly_aromantisch": {
        pathos: {
            gemeinsam: [
                "Both have unconventional relationship models.",
                "Autonomy is respected."
            ],
            spannung: [
                "Solopoly seeks romantic connections, Aromantic doesn't."
            ]
        },
        logos: {
            unterschied: [
                "Different expectations about romance."
            ]
        },
        pro: [
            "Both understand alternative relationship forms",
            "Autonomy is respected"
        ],
        contra: [
            "Solopoly seeks romantic connections",
            "Different relationship goals"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // POLYAMOR (from) - 8 Combinations
    // ═══════════════════════════════════════════════════════════════════════

    "polyamor_single": {
        pathos: {
            gemeinsam: [
                "Polyamor can offer Single warmth without exclusivity pressure."
            ],
            spannung: [
                "Single avoids the complexity that Polyamor brings.",
                "Polyamor's many relationships can be intimidating."
            ]
        },
        logos: {
            unterschied: [
                "Polyamor is highly structured, Single seeks simplicity.",
                "Communication intensity is radically different."
            ]
        },
        pro: [
            "No exclusivity expectation on Single",
            "Potential for enriching connection without full-time commitment",
            "Community can be supportive"
        ],
        contra: [
            "Single is overwhelmed by communication intensity",
            "Polyamor's structure is too much for Single",
            "Single feels lost in the complexity",
            "Different expectations of engagement"
        ]
    },

    "polyamor_duo": {
        pathos: {
            gemeinsam: [
                "Both value deep emotional connections."
            ],
            spannung: [
                "Duo's jealousy is frustrating for Polyamor.",
                "Non-exclusivity is unbearable for Duo."
            ]
        },
        logos: {
            unterschied: [
                "Exclusivity vs. ethical multiple relationships.",
                "Fundamental model conflict."
            ]
        },
        pro: [
            "Both value emotional depth",
            "Communication is important to both",
            "Duo could find security as Primary"
        ],
        contra: [
            "Duo cannot accept non-exclusivity",
            "Jealousy is inevitable",
            "Fundamental value conflict",
            "Duo will always want more exclusivity"
        ]
    },

    "polyamor_duo_flex": {
        pathos: {
            gemeinsam: [
                "Both know the complexity of multiple relationships.",
                "Communication is important to both."
            ],
            spannung: [
                "Depth of secondary relationships differs.",
                "Polyamor's secondaries are deeper than Duo-Flex's flex contacts."
            ]
        },
        logos: {
            gemeinsam: [
                "Both work with rules and structures."
            ],
            unterschied: [
                "Different expectations for non-primary connections."
            ]
        },
        pro: [
            "Shared understanding of structured openness",
            "Rules and boundaries are familiar to both",
            "Potential for complementary connection"
        ],
        contra: [
            "Depth differences in secondary relationships",
            "Duo-Flex expects less from secondaries than Polyamor",
            "Different time investments expected"
        ]
    },

    "polyamor_solopoly": {
        pathos: {
            gemeinsam: [
                "Deep kinship in polyamorous values.",
                "Honesty, communication, consent connect."
            ],
            spannung: [
                "Hierarchy differences can burden.",
                "Solopoly rejects what Polyamor practices: Primary/Secondary."
            ]
        },
        logos: {
            gemeinsam: [
                "Both consciously reflect on relationship forms.",
                "Communication is central."
            ],
            unterschied: [
                "Hierarchy vs. Equality."
            ]
        },
        pro: [
            "Shared polyamorous core values",
            "High communication competence on both sides",
            "Ethical foundation is identical"
        ],
        contra: [
            "Hierarchy discussions are inevitable",
            "Solopoly won't accept hierarchy",
            "Structural conflicts possible"
        ]
    },

    "polyamor_polyamor": {
        pathos: {
            gemeinsam: [
                "Perfect resonance: Both speak the same language of love.",
                "Deep love for multiple people is natural and understood.",
                "'The heart grows, it's not divided' – shared and lived.",
                "Compersion is possible on both sides.",
                "Complexity is experienced as enrichment."
            ],
            spannung: [
                "Sometimes overwhelm from the many emotional threads.",
                "Calendar management can be stressful."
            ]
        },
        logos: {
            gemeinsam: [
                "Identical relationship philosophy.",
                "Both understand hierarchies, agreements, communication structures.",
                "Rules are negotiable and understood.",
                "Community support is mutual."
            ]
        },
        pro: [
            "Maximum philosophical alignment",
            "Identical relationship model",
            "Mutual understanding for complexity",
            "Compersion is possible on both sides",
            "Communication is core competence for both",
            "Community support on both sides",
            "No explanations needed"
        ],
        contra: [
            "High coordination effort",
            "Calendar complexity doubles",
            "Time management becomes a challenge",
            "Many emotional threads can overwhelm",
            "Jealousy can occur despite experience"
        ]
    },

    "polyamor_ra": {
        pathos: {
            gemeinsam: [
                "Both understand non-monogamous lifestyles."
            ],
            spannung: [
                "RA rejects hierarchies that Polyamor often has.",
                "Polyamor's structure can feel confining for RA."
            ]
        },
        logos: {
            unterschied: [
                "Polyamor is structured, RA rejects all structures.",
                "Hierarchy differences are fundamental."
            ]
        },
        pro: [
            "Both understand non-monogamous lifestyles",
            "Openness for multiple connections"
        ],
        contra: [
            "RA rejects hierarchies",
            "Polyamor's structure can feel confining",
            "Different expectations about organization"
        ]
    },

    "polyamor_lat": {
        pathos: {
            gemeinsam: [
                "Both value conscious relationship design."
            ],
            spannung: [
                "LAT might expect more exclusivity.",
                "Polyamor's complexity might overwhelm LAT."
            ]
        },
        logos: {
            unterschied: [
                "LAT often lives exclusively, Polyamor by definition doesn't."
            ]
        },
        pro: [
            "LAT understands conscious distance",
            "Can function as partner in the network"
        ],
        contra: [
            "LAT might expect more exclusivity",
            "Complexity can overwhelm"
        ]
    },

    "polyamor_aromantisch": {
        pathos: {
            spannung: [
                "Polyamor seeks romantic love, Aromantic doesn't offer it.",
                "Fundamental difference in relationship definition."
            ]
        },
        logos: {
            unterschied: [
                "Polyamor focuses on romantic love.",
                "Aromantic can only offer platonic connections."
            ]
        },
        pro: [
            "Aromantic could be platonic partner",
            "Polyamor is open to different connection types"
        ],
        contra: [
            "Polyamor seeks romantic love",
            "Fundamental difference in expectations"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // RA - RELATIONSHIP ANARCHIST (from) - 8 Combinations
    // ═══════════════════════════════════════════════════════════════════════

    "ra_single": {
        pathos: {
            gemeinsam: [
                "Both value maximum freedom and self-determination.",
                "No labels or predefined expectations burden the encounter."
            ],
            spannung: [
                "Single might want more structure and clarity.",
                "RA's rejection of labels can be confusing."
            ]
        },
        logos: {
            gemeinsam: [
                "Both prioritize autonomy over social norms.",
                "No hierarchy conflicts expected."
            ],
            unterschied: [
                "RA has a conscious philosophy, Single is simply unattached."
            ]
        },
        pro: [
            "Maximum freedom on both sides",
            "No predefined expectations",
            "Individual agreements possible"
        ],
        contra: [
            "Can be confusing without clear structures",
            "Single might need more orientation"
        ]
    },

    "ra_duo": {
        pathos: {
            spannung: [
                "RA rejects the labels that are existential for Duo.",
                "Duo needs security through categories, RA flees them.",
                "Fundamental worldview conflict."
            ]
        },
        logos: {
            unterschied: [
                "Maximum incompatibility of relationship philosophies.",
                "RA cannot promise the exclusivity that Duo needs."
            ]
        },
        pro: [
            "RA is honest and authentic"
        ],
        contra: [
            "Fundamental incompatibility",
            "Duo needs labels and structure",
            "RA will never be 'partner' in Duo's sense"
        ]
    },

    "ra_duo_flex": {
        pathos: {
            gemeinsam: [
                "Both understand openness for alternative relationship forms.",
                "Duo-Flex's flexibility shows openness."
            ],
            spannung: [
                "RA rejects the primary relationship concept that is central for Duo-Flex.",
                "Structural conflict between radical freedom and rules."
            ]
        },
        logos: {
            gemeinsam: [
                "Both practice openness in relationships."
            ],
            unterschied: [
                "Duo-Flex has primary relationship, RA rejects hierarchies.",
                "Different definitions of freedom and structure."
            ]
        },
        pro: [
            "Duo-Flex shows openness for alternative models",
            "Both understand non-monogamous lifestyles",
            "Flexible agreements possible"
        ],
        contra: [
            "Primary relationship concept contradicts RA philosophy",
            "RA will never be part of a hierarchy",
            "Structural conflict is fundamental"
        ]
    },

    "ra_solopoly": {
        pathos: {
            gemeinsam: [
                "Deep philosophical kinship in autonomy needs.",
                "Both reject traditional relationship hierarchies.",
                "Maximum freedom is sacred to both."
            ],
            spannung: [
                "Solopoly is more structured than RA – has the 'Poly' concept.",
                "RA goes further in rejecting categories."
            ]
        },
        logos: {
            gemeinsam: [
                "Both prioritize autonomy over merging.",
                "No primary relationship expectations.",
                "Similar values in freedom and self-determination."
            ],
            unterschied: [
                "Solopoly works with the Poly framework, RA rejects all frameworks."
            ]
        },
        pro: [
            "Both maximize autonomy",
            "No hierarchy expectations",
            "Similar values and philosophy",
            "Mutual respect for radical self-determination"
        ],
        contra: [
            "Solopoly is more structured than RA prefers",
            "RA's radical label rejection can irritate even Solopoly"
        ]
    },

    "ra_polyamor": {
        pathos: {
            gemeinsam: [
                "Both understand non-monogamous lifestyles.",
                "Openness for multiple connections is familiar to both."
            ],
            spannung: [
                "RA rejects hierarchies that Polyamor often has.",
                "Polyamor's structure can feel confining for RA.",
                "The Primary/Secondary distinction is unacceptable for RA."
            ]
        },
        logos: {
            gemeinsam: [
                "Both consciously reflect on relationship forms."
            ],
            unterschied: [
                "Polyamor is structured, RA rejects all structures.",
                "Hierarchy differences are fundamental."
            ]
        },
        pro: [
            "Both understand non-monogamous lifestyles",
            "Openness for multiple connections"
        ],
        contra: [
            "RA rejects hierarchies, Polyamor often has them",
            "Polyamor's structure can feel confining",
            "Different expectations about organization"
        ]
    },

    "ra_ra": {
        pathos: {
            gemeinsam: [
                "Perfect resonance: Both live radical relationship freedom.",
                "No labels, no hierarchies – only authentic connection.",
                "The other's freedom is self-evident."
            ],
            spannung: [
                "Sometimes too much freedom can create disorientation."
            ]
        },
        logos: {
            gemeinsam: [
                "Identical philosophy: Each relationship is individual.",
                "No external expectations burden the connection."
            ]
        },
        pro: [
            "Maximum philosophical alignment",
            "No label conflicts",
            "Authentic connection without templates"
        ],
        contra: [
            "Can offer too little structure for some",
            "Socially hard to explain"
        ]
    },

    "ra_lat": {
        pathos: {
            gemeinsam: [
                "Both value their own space and autonomy.",
                "Separate living fits RA's philosophy."
            ],
            spannung: [
                "LAT has more traditional relationship expectations.",
                "RA's label rejection can unsettle LAT."
            ]
        },
        logos: {
            gemeinsam: [
                "Both understand the value of one's own space.",
                "No living-together expectation."
            ],
            unterschied: [
                "LAT is in a defined relationship, RA rejects definitions."
            ]
        },
        pro: [
            "LAT respects autonomy",
            "Separate living fits RA",
            "Both value their own space"
        ],
        contra: [
            "LAT has more relationship expectations than RA wants to fulfill",
            "RA's label rejection can be confusing for LAT"
        ]
    },

    "ra_aromantisch": {
        pathos: {
            gemeinsam: [
                "Both reject traditional relationship expectations.",
                "No predetermined scripts determine the connection.",
                "Individual agreements are self-evident."
            ],
            spannung: [
                "Different motivations: RA philosophical, Aromantic orientation-based."
            ]
        },
        logos: {
            gemeinsam: [
                "Both define relationships individually.",
                "No romantic expectations burden the connection."
            ],
            unterschied: [
                "RA is open to all connection forms, Aromantic excludes romance."
            ]
        },
        pro: [
            "Both reject traditional expectations",
            "Individual definitions possible",
            "No social norms determine the connection"
        ],
        contra: [
            "Different motivations for their attitudes",
            "Socially little understood"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // LAT - LIVING APART TOGETHER (from) - 8 Combinations
    // ═══════════════════════════════════════════════════════════════════════

    "lat_single": {
        pathos: {
            gemeinsam: [
                "Both value their own space and independence.",
                "LAT understands the need for retreat."
            ],
            spannung: [
                "LAT expects more commitment than Single is used to."
            ]
        },
        logos: {
            gemeinsam: [
                "Both live alone – this connects.",
                "No pressure to live together."
            ],
            unterschied: [
                "LAT is committed, Single is free."
            ]
        },
        pro: [
            "Own space remains preserved",
            "Good transition to relationship",
            "No merging expectation"
        ],
        contra: [
            "LAT expects commitment",
            "Single might hesitate with commitment"
        ]
    },

    "lat_duo": {
        pathos: {
            gemeinsam: [
                "Both want deep, committed relationship."
            ],
            spannung: [
                "Duo wants to live together – LAT doesn't.",
                "The living arrangement is a fundamental conflict."
            ]
        },
        logos: {
            unterschied: [
                "Fundamental difference in living arrangement.",
                "Duo sees living together as a sign of love."
            ]
        },
        pro: [
            "Both want depth and commitment",
            "Exclusivity is possible"
        ],
        contra: [
            "Living arrangement conflict is fundamental",
            "Duo might feel rejected"
        ]
    },

    "lat_duo_flex": {
        pathos: {
            gemeinsam: [
                "Both understand conscious distance and flexibility.",
                "Balance between closeness and own space is important to both."
            ],
            spannung: [
                "Different expectations about opening the relationship.",
                "LAT might expect more exclusivity."
            ]
        },
        logos: {
            gemeinsam: [
                "Both value the balance of closeness and distance.",
                "Flexibility is familiar to both."
            ],
            unterschied: [
                "Duo-Flex's opening for others vs. LAT's focus on living arrangement."
            ]
        },
        pro: [
            "Both understand flexibility in relationships",
            "Good balance between closeness and distance possible",
            "No living-together expectation"
        ],
        contra: [
            "Different priorities regarding opening",
            "LAT might expect exclusivity that Duo-Flex doesn't offer"
        ]
    },

    "lat_solopoly": {
        pathos: {
            gemeinsam: [
                "Both live separately and value autonomy.",
                "No living-together conflict – both live alone."
            ],
            spannung: [
                "LAT might expect more exclusivity than Solopoly can offer."
            ]
        },
        logos: {
            gemeinsam: [
                "Both understand separate living as a conscious choice.",
                "Autonomy is important to both."
            ],
            unterschied: [
                "Solopoly has multiple partners, LAT often only one."
            ]
        },
        pro: [
            "Both live separately – no living conflict",
            "Autonomy understanding on both sides",
            "Mutual respect for own space"
        ],
        contra: [
            "LAT might expect more exclusivity",
            "Solopoly's multiple partners can irritate LAT"
        ]
    },

    "lat_polyamor": {
        pathos: {
            gemeinsam: [
                "Both value conscious relationship design."
            ],
            spannung: [
                "LAT might be overwhelmed by Polyamor's complexity.",
                "Polyamor's many relationships can unsettle LAT."
            ]
        },
        logos: {
            gemeinsam: [
                "Both reflect on their relationship form."
            ],
            unterschied: [
                "LAT often lives exclusively, Polyamor by definition doesn't.",
                "Different levels of complexity."
            ]
        },
        pro: [
            "LAT can function as partner in the network",
            "Both understand non-traditional models"
        ],
        contra: [
            "LAT might expect more exclusivity",
            "Polyamor's complexity can overwhelm LAT"
        ]
    },

    "lat_ra": {
        pathos: {
            gemeinsam: [
                "Both value their own space and independence.",
                "No living-together expectation."
            ],
            spannung: [
                "RA's label rejection can unsettle LAT.",
                "LAT needs more definition than RA wants to give."
            ]
        },
        logos: {
            gemeinsam: [
                "Both understand the value of autonomy.",
                "Separate living is self-evident."
            ],
            unterschied: [
                "LAT has clear relationship definition, RA rejects definitions."
            ]
        },
        pro: [
            "RA respects LAT's autonomy",
            "Both value their own space",
            "No living-together conflicts"
        ],
        contra: [
            "RA's label rejection can be confusing",
            "LAT needs more structure than RA offers"
        ]
    },

    "lat_lat": {
        pathos: {
            gemeinsam: [
                "Perfect resonance: Both understand the value of one's own space.",
                "Quality time over quantity.",
                "The conscious distance is mutually understood."
            ],
            spannung: [
                "Sometimes both might be too distanced."
            ]
        },
        logos: {
            gemeinsam: [
                "Identical living philosophy.",
                "Both value the balance of closeness and distance."
            ]
        },
        pro: [
            "Maximum alignment in living arrangement",
            "Mutual understanding for own space",
            "No living-together conflicts"
        ],
        contra: [
            "Both might be too distanced",
            "Socially perceived as 'not serious'"
        ]
    },

    "lat_aromantisch": {
        pathos: {
            gemeinsam: [
                "Both value distance and own space.",
                "Platonic LAT relationship is conceivable."
            ],
            spannung: [
                "LAT might expect romance that Aromantic cannot offer."
            ]
        },
        logos: {
            gemeinsam: [
                "Both can handle separate living.",
                "No merging expectation."
            ],
            unterschied: [
                "LAT often expects romantic relationship.",
                "Aromantic can only offer platonic connections."
            ]
        },
        pro: [
            "Both value distance and own space",
            "Platonic LAT relationship is possible",
            "No living-together expectation"
        ],
        contra: [
            "LAT might expect romance",
            "Different relationship goals"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // AROMANTIC (from) - 8 Combinations
    // ═══════════════════════════════════════════════════════════════════════

    "aromantisch_single": {
        pathos: {
            gemeinsam: [
                "Both have no romantic expectations of each other.",
                "Deep friendship is the foundation."
            ],
            spannung: [
                "Single might seek romance that Aromantic cannot offer."
            ]
        },
        logos: {
            gemeinsam: [
                "Both are autonomous and independent.",
                "No romantic scripts to fulfill."
            ],
            unterschied: [
                "Single is open to romance, Aromantic is not."
            ]
        },
        pro: [
            "Deep platonic connection possible",
            "No romantic expectations",
            "Autonomy is respected"
        ],
        contra: [
            "Single might miss romance",
            "Different relationship goals possible"
        ]
    },

    "aromantisch_duo": {
        pathos: {
            spannung: [
                "Duo seeks romantic love – exactly what Aromantic cannot offer.",
                "Fundamental difference in relationship definition.",
                "Duo might feel unloved."
            ]
        },
        logos: {
            unterschied: [
                "Maximum incompatibility in romantic expectations.",
                "Aromantic cannot speak the romantic language."
            ]
        },
        pro: [
            "Deep connection on another level possible"
        ],
        contra: [
            "Duo expects romance",
            "Fundamental difference",
            "Duo doesn't feel 'properly' loved"
        ]
    },

    "aromantisch_duo_flex": {
        pathos: {
            gemeinsam: [
                "Duo-Flex shows flexibility that accommodates Aromantic."
            ],
            spannung: [
                "Duo-Flex expects romantic primary relationship.",
                "Aromantic cannot fulfill this expectation."
            ]
        },
        logos: {
            gemeinsam: [
                "Both have unconventional relationship approaches."
            ],
            unterschied: [
                "Romantic expectations for primary partner exist with Duo-Flex.",
                "Aromantic can only offer platonic connections."
            ]
        },
        pro: [
            "Duo-Flex is more flexible than Duo",
            "Aromantic could fit as Flex partner",
            "Both understand non-traditional relationship forms"
        ],
        contra: [
            "Romantic expectations for primary partner exist",
            "Fundamental differences in romance",
            "Aromantic will never be romantic partner"
        ]
    },

    "aromantisch_solopoly": {
        pathos: {
            gemeinsam: [
                "Both have unconventional relationship models.",
                "Autonomy is respected on both sides."
            ],
            spannung: [
                "Solopoly seeks romantic connections.",
                "Aromantic can only offer platonic depth."
            ]
        },
        logos: {
            gemeinsam: [
                "Both live autonomously and self-determined.",
                "No traditional expectations."
            ],
            unterschied: [
                "Solopoly is oriented toward romantic relationships.",
                "Aromantic excludes romance."
            ]
        },
        pro: [
            "Solopoly understands alternative relationship forms",
            "Autonomy is respected",
            "Deep platonic connection is possible"
        ],
        contra: [
            "Solopoly seeks romantic connections",
            "Different relationship goals",
            "Aromantic cannot fulfill romantic expectations"
        ]
    },

    "aromantisch_polyamor": {
        pathos: {
            gemeinsam: [
                "Polyamor is open to different connection types."
            ],
            spannung: [
                "Polyamor focuses on romantic love.",
                "Aromantic can only offer platonic connections.",
                "Fundamental difference in relationship definition."
            ]
        },
        logos: {
            gemeinsam: [
                "Both reflect on relationship forms."
            ],
            unterschied: [
                "Polyamor defines itself through romantic multiple love.",
                "Aromantic cannot share this basis."
            ]
        },
        pro: [
            "Polyamor is open to different connection types",
            "Aromantic could be platonic partner",
            "Community aspect can be enriching"
        ],
        contra: [
            "Polyamor focuses on romantic love",
            "Fundamental difference in expectations",
            "Aromantic will always be 'different' in the network"
        ]
    },

    "aromantisch_ra": {
        pathos: {
            gemeinsam: [
                "Both reject traditional relationship expectations.",
                "No predetermined scripts determine the connection.",
                "Individual agreements are self-evident."
            ],
            spannung: [
                "Different motivations for their attitudes."
            ]
        },
        logos: {
            gemeinsam: [
                "Both define relationships individually.",
                "No romantic expectations as obligation."
            ],
            unterschied: [
                "RA is open to all connection forms, Aromantic excludes romance."
            ]
        },
        pro: [
            "RA rejects relationship labels – fits Aromantic",
            "Individual definitions possible",
            "Both reject traditional expectations"
        ],
        contra: [
            "Different motivations",
            "Socially little understood"
        ]
    },

    "aromantisch_lat": {
        pathos: {
            gemeinsam: [
                "Both value own space and distance.",
                "Platonic LAT relationship is conceivable."
            ],
            spannung: [
                "LAT often expects romantic relationship.",
                "Aromantic cannot fulfill this expectation."
            ]
        },
        logos: {
            gemeinsam: [
                "Both live separately and value it.",
                "No merging expectation."
            ],
            unterschied: [
                "LAT is often oriented toward romantic relationship."
            ]
        },
        pro: [
            "LAT can function platonically",
            "Own space is respected",
            "Both value distance"
        ],
        contra: [
            "LAT might expect romance",
            "Different relationship goals"
        ]
    },

    "aromantisch_aromantisch": {
        pathos: {
            gemeinsam: [
                "Perfect resonance: Both understand the lack of romantic attraction.",
                "Deep platonic love is the shared language.",
                "No societal expectations of romance."
            ],
            spannung: [
                "Socially little understood and supported."
            ]
        },
        logos: {
            gemeinsam: [
                "Identical understanding of relationship.",
                "No romantic scripts to fulfill."
            ]
        },
        pro: [
            "Maximum alignment",
            "Deep platonic connection",
            "Mutual understanding without explanations"
        ],
        contra: [
            "Socially little understood",
            "Few role models and support"
        ]
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = archetypeStatements_EN;
}

// Browser export
if (typeof window !== 'undefined') {
    window.archetypeStatements_EN = archetypeStatements_EN;
}
