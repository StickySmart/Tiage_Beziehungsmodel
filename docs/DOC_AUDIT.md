# Doc Audit — Living Checklist

> Every claim in the theory docs must trace to a source. This file maps claims to code. When the code changes, update the doc AND this file.

**Last verified:** Mai 2026

---

## How to use

Before merging any change to the calculation logic, scan the "Verify when..." column and update the affected docs. The goal is that docs.html always shows what the code actually does.

---

## Critical Claims (must stay in sync)

| Claim | Documented in | Code source | Verify when... |
|-------|--------------|-------------|----------------|
| Score formula: `(O×wO×R1)+(A×wA×R2)+(D×wD×R3)+(G×wG×R4)` | resonance.md, score-calculation-overview.md, factors.md | `calculationEngine.js:483` → `calculateRelationshipQuality()` | Formula changes |
| Default weights all equal (25% each) | pathos-logos.md, factors.md, tiage-synthesis.md | `agodWeights.js` → `AGOD_DEFAULT_WEIGHTS = {O:1,A:1,D:1,G:1}` | AGOD defaults change |
| Pathos = 75%, Logos = 25% | pathos-logos.md (DE+EN), tiage-synthesis.md (DE+EN), archetype-interaction.html footer | Mathematical consequence of equal AGOD weights | AGOD defaults change |
| R1–R4 range 0.8–1.3 | resonance.md, score-calculation-overview.md | `needsIntegration.js` → R-calculation | R range changes |
| R threshold ≥ 1.05 = Resonanz, ≤ 0.95 = Dissonanz | resonance.md (DE+EN) | `needsIntegration.js` → interpretation table | Threshold changes |
| combineRFactors = `(a+b) × min(a,b)/max(a,b) / 2` | resonance.md, score-calculation-overview.md | `server/logic/needsIntegration.js` → `combineRFactors()` | Formula changes |
| R4 = `(identityScore×0.30 + attractionScore×0.70)²` | resonance.md, factors.md, score-calculation-overview.md | `calculationEngine.js` → `calculateR4Hybrid()` | Weights change |
| Balance B = `(100 − \|Logos−Pathos\|) / 100` — display only | pathos-logos.md (DE+EN) | `calculationEngine.js:174` → `calculateLogosPathosBalance()` | Formula changes |
| calculateResonanz = `0.9 + [(M/100×0.35)+(B×0.35)+(K×0.30)]×0.2` | pathos-logos.md (DE+EN) | `calculationEngine.js:214` → `calculateResonanz()` | Formula changes |
| FFH modifier: both fit+horny=+8, partner fit+horny=+15 | resonance.md (DE+EN) | `TiageExtrasModifier.js` | Modifier values change |
| GFK thresholds: high ≥ 82, medium ≥ 48, low < 48 | resonance.md, score-calculation-overview.md | `gfkMatching.js` | Threshold changes |
| 8 Archetypes: Single/Duo/Duo-Flex/Solopoly/Polyamor/RA/LAT/Aromantisch | factors.md, tiage-synthesis.md | `archetype-matrix.json` | Archetype list changes |
| 16 Grundbedürfnisse in 4 Stufen | resonance.md, score-calculation-overview.md | `beduerfnis-katalog.json` (v4.0.0) | Catalog changes |
| Needs→R mapping: R1=#B1,3,7,12 / R2=#B2,8,9,14 / R3=#B4,5,6,11 / R4=#B10,13,15,16 | resonance.md (DE+EN) | `server/logic/needsIntegration.js` → `DIMENSION_NEED_IDS` | Mapping changes |
| Hard-KO: score=0 → `{score:0, blocked:true}` | factors.md, score-calculation-overview.md | `calculationEngine.js` | KO logic changes |
| RTI 5 Säulen: S1 Leiblichkeit, S2 Soziales Netz, S3 Autonomie, S4 Sicherheit, S5 Werte & Sinn | tiage-synthesis.md (DE+EN) | `syntheseModal.js`, `locales/de.js:1601` | RTI pillars change |

---

## Philosophical Attribution

| Claim | Documented in | Source | Risk |
|-------|--------------|--------|------|
| Volker Schmidt = author of 16 Grundbedürfnisse | tiage-synthesis.md, resonance.md, rtiPriorities.js, profiles/archetypen/*.js | Book: *Liebe will gelernt sein* | beduerfnis-katalog.json still had wrong name "Volker Kiel" until May 2026 — fixed |
| Hilarion Petzold = RTI 5 Säulen | tiage-synthesis.md (DE+EN), locales/de.js:1865 | RTI model / Integrative Therapie | Footer text in synthesis already correct; docs table was missing — fixed May 2026 |
| OSHO images = OSHO Zen Tarot, rights at Ma Deva Padma / Osho International Foundation | osho.md, resonance.md | OSHO Zen Tarot deck | Any new image assets |
| Marshall B. Rosenberg = GFK/NVC | tiage-synthesis.md, gfk-rosenberg.md | *Gewaltfreie Kommunikation* (2001) | Stable |
| Robert M. Pirsig = MOQ | pirsig.md, tiage-synthesis.md | *Zen and the Art of Motorcycle Maintenance* (1974), *Lila* (1991) | Stable |

---

## Legal Documents

| Document | Location | Last updated | Gaps / Action needed |
|----------|----------|-------------|----------------------|
| Impressum | `archetype-interaction.html` (modal, line ~2759) | — | **⚠️ MISSING POSTAL ADDRESS** — German TMG §5 requires name + full postal address. Only "Ti-Age" + email currently listed. Add: operator's full legal name and postal address. |
| Datenschutz | `datenschutz.html`, `docs/legal/datenschutz.md` | Mai 2026 | Vercel named as hosting provider with privacy policy link. ✓ |
| Nutzungsbedingungen | `nutzungsbedingungen.html`, `docs/legal/nutzungsbedingungen.md` | Mai 2026 | 25:75 weighting now explicit. ✓ |

### Impressum — what is required under §5 TMG (Germany)

```
Required:
✓ Name of operator (legal name, not just "Ti-Age")
✗ Full postal address
✓ Email address
✗ Phone number (recommended, not strictly required for non-commercial)
  → For a private non-commercial site, reduced requirements apply
  → But a publicly accessible website about relationships/data processing
    strongly benefits from a complete Impressum
```

**Recommended action:** Add operator's real name and postal address (or P.O. box) to the Impressum modal, or replace the modal with a dedicated `impressum.html` page.

---

## Version Drift Checks

Run these when upgrading major features:

```bash
# Check for stale formula references
grep -r "meanR\|rawCompatibility\|40:60\|40\/60" docs/ --include="*.md"

# Check for stale author references
grep -r "Volker Kiel\|Petzold" docs/ --include="*.md"

# Check score-calculation source line numbers are still valid
grep -n "calculateRelationshipQuality" js/synthesis/calculationEngine.js

# Check AGOD default weights still equal
grep "AGOD_DEFAULT_WEIGHTS" js/weights/agodWeights.js
```

---

## Changelog

| Date | Change |
|------|--------|
| 2026-05-27 | Initial audit. Fixed: 40:60→25:75 everywhere, Volker Kiel→Volker Schmidt everywhere, added Petzold/RTI to tiage-synthesis.md, updated Datenschutz (Vercel named, Stand Mai 2026), updated Nutzungsbedingungen (Stand Mai 2026, explicit 25:75), fixed osho.md R threshold (1.1→1.05), fixed gfk-rosenberg.md date. |
