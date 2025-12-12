# Gaussian Distribution of Needs by Profile Factors

> **Research Date:** 2025-12-08
> **Purpose:** Dynamic default values based on profile combination

## Validation Status

| Category | Needs | Validated | Quote |
|----------|-------|-----------|-------|
| NVC Core (Rosenberg) | 88 | 88 | ✅ 100% |
| Life Topics | 47 | 47 | ✅ 100% |
| Pirsig (Quality) | 41 | 0 | ⚠️ 0% |
| Osho (Tantra/Zen) | 40 | 0 | ⚠️ 0% |
| **Total** | **216** | **135** | **62%** |

This document describes how each of the **135 validated needs** (NVC + Life Topics) is influenced by the five profile factors:
- **Archetype** (8): Single, Aromantic, Duo, LAT, Solopoly, RA, Duo-Flex, Polyamorous
- **Dominance** (4): Dominant, Submissive, Switch, Vanilla
- **Orientation** (3): Heterosexual, Homosexual, Bisexual
- **Gender** (3): Male, Female, Inter
- **Gender Identity** (9): Male-Cis, Male-Trans, Male-Searching, Female-Cis, Female-Trans, Female-Searching, Inter-Nonbinary, Inter-Fluid, Inter-Searching

---

## Calculation Formula

```
Need-Default = Base(50) + Archetype-Delta + Dominance-Delta + Orientation-Delta + Gender-Delta + Identity-Delta
```

Example for "desire_for_children":
- Base: 50
- Single: -15 | Duo: +10
- Dominant: +5 | Submissive: 0
- Heterosexual: +10 | Homosexual: -5
- Male: -5 | Female: +10
- Male-Trans: +5 (increased desire for biological family)
→ Single + Heterosexual + Male + Male-Trans = 50 - 15 + 10 - 5 + 5 = **45**

---

## Key Archetype Profile Tendencies

| Archetype | Main Tendency | Key Needs ↑ | Key Needs ↓ |
|-----------|---------------|-------------|-------------|
| **Single** | Autonomy | own_space, independence, self_determination | shared_living, commitment, closeness |
| **Aromantic** | Non-romantic | alone_recharging, secularity | romantic_gestures, cuddling, commitment |
| **Duo** | Traditional | commitment, nest_building, fidelity_promise | own_space, independence |
| **LAT** | Living Apart | own_space, independence | shared_living, sharing_daily_life |
| **Solopoly** | Solo + Poly | own_friends, social_energy, independence | commitment, fidelity_promise |
| **RA** | Anarchy | openness_to_new, independence | tradition, commitment |
| **Duo-Flex** | Flexible Duo | long_term_bonding, nest_building | N/A - flexible |
| **Polyamorous** | Multi-Partner | social_energy, sociability | fidelity_promise, tradition |

---

## Key Dominance Profile Tendencies

| Dominance | Main Tendency | Key Needs ↑ | Key Needs ↓ |
|-----------|---------------|-------------|-------------|
| **Dominant** | Leadership | taking_responsibility, conflict_resolution, structure | conflict_avoidance, vulnerability |
| **Submissive** | Devotion | vulnerability, harmony, touch | conflict_resolution, emotional_restraint |
| **Switch** | Flexible | sexual_experimentation, flexibility | N/A - flexible |
| **Vanilla** | Balanced | harmony, emotional_security | sexual_experimentation |

---

## Key Gender Profile Tendencies

| Gender | Main Tendency | Key Needs ↑ | Key Needs ↓ |
|--------|---------------|-------------|-------------|
| **Male** | Activity | N/A | emotional_openness, verbal_connection |
| **Female** | Communication | emotional_openness, care, verbal_connection | N/A |
| **Diverse** | Authenticity | acceptance, identity, authenticity | tradition |

---

## Sources

1. [Pew Research - Marriage & Family](https://www.pewresearch.org/social-trends/2014/09/24/chapter-1-public-views-on-marriage/)
2. [Psychology Today - Introversion](https://www.psychologytoday.com/us/blog/people-unexplained/202203/why-almost-no-one-is-100-percent-extraverted-or-introverted)
3. [Hébert & Weaver - BDSM Roles](https://utppublishing.com/doi/abs/10.3138/cjhs.2467)
4. [Wismeijer & van Assen - BDSM Psychology](https://pubmed.ncbi.nlm.nih.gov/23679066/)
5. [Allen et al. - Sexual Orientation & Personality](https://pubmed.ncbi.nlm.nih.gov/32510233/)
6. [Hims - Love Languages Survey](https://www.hims.com/news/popular-love-languages)
7. [Niagara Institute - Conflict Styles](https://www.niagarainstitute.com/blog/workplace-conflict-statistics)
8. [PwC - Consumer Survey 2024](https://www.pwc.com/gx/en/news-room/press-releases/2024/pwc-2024-voice-of-consumer-survey.html)

---

*Last Update: 2025-12-07*
