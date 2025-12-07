# Gaußsche Verteilung der Bedürfnisse nach Profil-Faktoren

> **Recherche-Datum:** 2025-12-07
> **Nächste geplante Aktualisierung:** 2026-12-07
> **Zweck:** Dynamische Default-Werte basierend auf Profil-Kombination

Dieses Dokument beschreibt, wie jedes der **137 Bedürfnisse** von den vier Profil-Faktoren beeinflusst wird:
- **Archetyp** (8): Single, Aromantisch, Duo, LAT, Solopoly, RA, Duo-Flex, Polyamor
- **Dominanz** (4): Dominant, Submissiv, Switch, Vanilla
- **Orientierung** (3): Heterosexuell, Homosexuell, Bisexuell
- **Geschlecht** (3): Mann, Frau, Divers

---

## Berechnungsformel

```
Bedürfnis-Default = Basis(50) + Archetyp-Delta + Dominanz-Delta + Orientierung-Delta + Geschlecht-Delta
```

Beispiel für "kinderwunsch":
- Basis: 50
- Single: -15 | Duo: +10
- Dominant: +5 | Submissiv: 0
- Heterosexuell: +10 | Homosexuell: -5
- Mann: -5 | Frau: +10
→ Single + Heterosexuell + Mann = 50 - 15 + 10 - 5 = **40**

---

## TEIL 1: LEBENSPLANUNG

### 1.1 Kinder (pr-kinder)

| Bedürfnis | Basis | Beschreibung |
|-----------|-------|--------------|
| kinderwunsch | 55 | Wunsch, eigene Kinder zu haben |
| elternschaft | 55 | Wunsch, Elternrolle zu übernehmen |
| fortpflanzung | 50 | Biologischer Fortpflanzungswunsch |
| fuersorge | 55 | Für andere sorgen wollen |
| familie_gruenden | 55 | Eigene Familie aufbauen |
| generativitaet | 50 | Etwas an nächste Generation weitergeben |
| verantwortung_uebernehmen | 55 | Bereitschaft für Verantwortung |

#### Archetyp-Deltas für Kinder-Bedürfnisse

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| kinderwunsch | -20 | -25 | +15 | +5 | -5 | -10 | +10 | 0 |
| elternschaft | -15 | -20 | +15 | +5 | 0 | -5 | +10 | +5 |
| fortpflanzung | -15 | -20 | +10 | 0 | -10 | -15 | +5 | -5 |
| fuersorge | -5 | -15 | +10 | +5 | +5 | 0 | +10 | +5 |
| familie_gruenden | -20 | -25 | +20 | +5 | -10 | -15 | +15 | 0 |
| generativitaet | -10 | -15 | +10 | +5 | 0 | -5 | +10 | +5 |
| verantwortung_uebernehmen | -5 | -10 | +10 | +5 | +5 | 0 | +10 | +5 |

**Quellen:**
- Singles: 69% wollen Kinder, aber priorisieren Autonomie ([Pew Research](https://www.pewresearch.org/short-reads/2024/02/15/among-young-adults-without-children-men-are-more-likely-than-women-to-say-they-want-to-be-parents-someday/))
- Aromantisch: Niedrigster Kinderwunsch aufgrund fehlender romantischer Partnerschaft
- Duo: Höchster Kinderwunsch - traditionelles Familienmodell
- Polyamor: Variabel - Co-Parenting möglich aber komplex

#### Dominanz-Deltas für Kinder-Bedürfnisse

| Bedürfnis | Dominant | Submissiv | Switch | Vanilla |
|-----------|----------|-----------|--------|---------|
| kinderwunsch | 0 | 0 | 0 | +5 |
| elternschaft | +5 | -5 | 0 | +5 |
| fuersorge | +10 | +5 | +5 | +5 |
| verantwortung_uebernehmen | +10 | -5 | +5 | +5 |

**Quellen:**
- Dominante zeigen höhere Fürsorge-Orientierung ([Hébert & Weaver, 2015](https://utppublishing.com/doi/abs/10.3138/cjhs.2467))

#### Orientierung-Deltas für Kinder-Bedürfnisse

| Bedürfnis | Heterosexuell | Homosexuell | Bisexuell |
|-----------|---------------|-------------|-----------|
| kinderwunsch | +5 | -10 | 0 |
| fortpflanzung | +10 | -15 | 0 |
| familie_gruenden | +5 | -5 | 0 |

**Quellen:**
- Homosexuelle Paare: 37% Kinderwunsch vs. ~70% heterosexuelle ([Williams Institute](https://williamsinstitute.law.ucla.edu/))
- Biologische Fortpflanzung erfordert bei homosexuellen Paaren zusätzliche Schritte

#### Geschlecht-Deltas für Kinder-Bedürfnisse

| Bedürfnis | Mann | Frau | Divers |
|-----------|------|------|--------|
| kinderwunsch | -5 | +10 | 0 |
| elternschaft | -5 | +10 | 0 |
| fuersorge | -5 | +10 | 0 |

**Quellen:**
- Frauen (45%) vs. Männer (57%) wollen Kinder - aber Frauen priorisieren es stärker ([Pew Research](https://www.pewresearch.org/short-reads/2024/02/15/among-young-adults-without-children-men-are-more-likely-than-women-to-say-they-want-to-be-parents-someday/))

---

### 1.2 Ehe (pr-ehe)

| Bedürfnis | Basis | Beschreibung |
|-----------|-------|--------------|
| verbindlichkeit | 50 | Wunsch nach fester Zusage |
| langfristige_bindung | 55 | Langfristige Beziehung anstreben |
| rechtliche_sicherheit | 45 | Rechtliche Absicherung wichtig |
| gesellschaftliche_anerkennung | 40 | Soziale Anerkennung der Beziehung |
| tradition | 45 | Traditionelle Ehe-Werte |
| treueversprechen | 55 | Gegenseitiges Treueversprechen |

#### Archetyp-Deltas für Ehe-Bedürfnisse

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| verbindlichkeit | -25 | -30 | +20 | +5 | -15 | -20 | +10 | -10 |
| langfristige_bindung | -20 | -25 | +20 | +10 | -5 | -10 | +15 | +5 |
| rechtliche_sicherheit | -20 | -25 | +20 | +5 | -15 | -20 | +15 | -10 |
| gesellschaftliche_anerkennung | -15 | -20 | +15 | 0 | -15 | -20 | +10 | -15 |
| tradition | -20 | -25 | +20 | -5 | -20 | -25 | +5 | -20 |
| treueversprechen | -15 | -20 | +20 | +10 | -25 | -20 | +10 | -30 |

**Quellen:**
- 69% unverheirateter junger Erwachsener wollen heiraten ([Pew Research](https://www.pewresearch.org/social-trends/2014/09/24/chapter-1-public-views-on-marriage/))
- Singles & Aromantisch: Niedrigste Ehe-Orientierung - Autonomie-Fokus
- Polyamor: Treueversprechen anders definiert (nicht-exklusiv)
- RA (Relationship Anarchists): Lehnen institutionelle Beziehungsformen ab

---

### 1.3 Zusammenwohnen (pr-zusammen)

| Bedürfnis | Basis | Beschreibung |
|-----------|-------|--------------|
| gemeinsamer_wohnraum | 55 | Zusammen wohnen wollen |
| haeuslichkeit | 50 | Häusliche Atmosphäre schätzen |
| nest_bauen | 55 | Gemeinsames Zuhause aufbauen |
| alltag_teilen | 55 | Tägliches Leben teilen |
| naehe | 55 | Räumliche Nähe zum Partner |
| eigener_raum | 50 | Eigenen Bereich haben |
| rueckzugsort | 55 | Rückzugsmöglichkeit haben |

#### Archetyp-Deltas für Zusammenwohnen-Bedürfnisse

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| gemeinsamer_wohnraum | -30 | -30 | +20 | -25 | -20 | -15 | +10 | 0 |
| haeuslichkeit | -10 | -15 | +15 | -5 | -10 | -10 | +10 | 0 |
| nest_bauen | -25 | -25 | +20 | -15 | -15 | -15 | +15 | +5 |
| alltag_teilen | -20 | -25 | +20 | -10 | -10 | -10 | +15 | +10 |
| naehe | -15 | -20 | +15 | -15 | -5 | -5 | +10 | +5 |
| eigener_raum | +20 | +25 | -10 | +20 | +20 | +20 | 0 | +10 |
| rueckzugsort | +15 | +20 | -5 | +15 | +15 | +15 | +5 | +10 |

**Quellen:**
- LAT (Living Apart Together): Per Definition getrennte Haushalte bevorzugt
- Single/Aromantisch: Hoher Wert auf eigenen Raum
- Duo: Traditionelles Zusammenwohnen-Modell

---

## TEIL 2: KOMMUNIKATION

### 2.1 Gesprächsbedürfnis (pr-gespraech)

| Bedürfnis | Basis | Beschreibung |
|-----------|-------|--------------|
| taeglicher_austausch | 50 | Tägliche Kommunikation |
| tiefgehende_gespraeche | 55 | Bedeutungsvolle Gespräche |
| small_talk | 45 | Leichte Unterhaltung |
| stille_gemeinsam | 50 | Gemeinsame Stille genießen |
| verbale_verbindung | 55 | Durch Worte verbinden |
| zuhoeren | 60 | Aktiv zuhören |

#### Geschlecht-Deltas für Kommunikation

| Bedürfnis | Mann | Frau | Divers |
|-----------|------|------|--------|
| taeglicher_austausch | -10 | +10 | 0 |
| tiefgehende_gespraeche | -10 | +10 | 0 |
| verbale_verbindung | -10 | +10 | 0 |
| zuhoeren | -5 | +10 | 0 |

**Quellen:**
- Frauen kommunizieren durchschnittlich 20.000 Wörter/Tag vs. Männer 7.000 ([Brizendine, 2006](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2335386/))
- 65% der Paare nennen Kommunikation als größte Herausforderung ([Gitnux](https://gitnux.org/healthy-relationship-statistics/))

---

### 2.2 Emotionale Offenheit (pr-emotional)

| Bedürfnis | Basis | Beschreibung |
|-----------|-------|--------------|
| emotionale_offenheit | 50 | Gefühle offen zeigen |
| gefuehle_zeigen | 50 | Emotionen ausdrücken |
| verletzlichkeit | 45 | Sich verletzlich zeigen |
| emotionale_zurueckhaltung | 50 | Gefühle zurückhalten |
| emotionale_sicherheit | 60 | Sicherheit für Emotionen |
| gefuehle_teilen | 55 | Gefühle miteinander teilen |

#### Dominanz-Deltas für Emotionale Offenheit

| Bedürfnis | Dominant | Submissiv | Switch | Vanilla |
|-----------|----------|-----------|--------|---------|
| emotionale_offenheit | -5 | +10 | +5 | 0 |
| verletzlichkeit | -10 | +15 | +5 | 0 |
| emotionale_zurueckhaltung | +10 | -10 | 0 | 0 |
| gefuehle_teilen | 0 | +10 | +5 | +5 |

**Quellen:**
- Submissive zeigen höhere Offenheit für Verletzlichkeit ([Hébert & Weaver, 2015](https://utppublishing.com/doi/abs/10.3138/cjhs.2467))
- Dominante zeigen mehr emotionale Kontrolle

#### Geschlecht-Deltas für Emotionale Offenheit

| Bedürfnis | Mann | Frau | Divers |
|-----------|------|------|--------|
| emotionale_offenheit | -15 | +10 | +5 |
| gefuehle_zeigen | -15 | +10 | +5 |
| verletzlichkeit | -15 | +10 | +5 |

**Quellen:**
- Frauen zeigen höhere emotionale Expressivität ([AJS Study](https://www.journals.uchicago.edu/doi/10.1086/382111))
- Männer sozialisiert für emotionale Zurückhaltung

---

### 2.3 Konfliktverhalten (pr-konflikt)

| Bedürfnis | Basis | Beschreibung |
|-----------|-------|--------------|
| konfliktklaerung | 55 | Konflikte aktiv klären |
| harmonie | 55 | Harmonisches Miteinander |
| aussprache | 55 | Dinge aussprechen |
| konflikt_vermeiden | 45 | Konflikte meiden |
| streitkultur | 50 | Konstruktiv streiten |
| versoehnlichkeit | 60 | Sich versöhnen können |

#### Dominanz-Deltas für Konfliktverhalten

| Bedürfnis | Dominant | Submissiv | Switch | Vanilla |
|-----------|----------|-----------|--------|---------|
| konfliktklaerung | +10 | -5 | +5 | 0 |
| harmonie | -5 | +10 | 0 | +5 |
| aussprache | +10 | -5 | +5 | 0 |
| konflikt_vermeiden | -15 | +15 | 0 | 0 |
| streitkultur | +10 | -5 | +5 | 0 |

**Quellen:**
- 59.8% bevorzugen kollaborativen Konfliktstil ([Niagara Institute](https://www.niagarainstitute.com/blog/workplace-conflict-statistics))
- Nur 4.6% bevorzugen Vermeidung in westlichen Kulturen

---

## TEIL 3: SOZIALES

### 3.1 Introversion/Extroversion (pr-introextro)

| Bedürfnis | Basis | Beschreibung |
|-----------|-------|--------------|
| soziale_energie | 50 | Energie aus sozialem Kontakt |
| geselligkeit | 50 | Gerne unter Menschen |
| ruhe_von_menschen | 50 | Ruhe von Menschen brauchen |
| allein_aufladen | 50 | Alleine Energie tanken |
| menschen_treffen | 50 | Menschen treffen wollen |
| kleine_gruppen | 55 | Kleine Gruppen bevorzugen |

**Quellen:**
- 70% der Bevölkerung sind Ambiverts ([Psychology Today](https://www.psychologytoday.com/us/blog/people-unexplained/202203/why-almost-no-one-is-100-percent-extraverted-or-introverted))
- Exakte Normalverteilung - daher Basis 50 für alle

#### Archetyp-Deltas für Soziales

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| soziale_energie | +5 | +5 | -5 | 0 | +10 | +10 | 0 | +10 |
| geselligkeit | +5 | +5 | -5 | 0 | +10 | +10 | 0 | +15 |
| ruhe_von_menschen | +5 | +10 | +5 | +10 | 0 | 0 | +5 | -5 |
| allein_aufladen | +15 | +20 | 0 | +15 | +10 | +10 | +5 | 0 |
| menschen_treffen | +5 | 0 | -5 | 0 | +15 | +10 | 0 | +15 |

**Quellen:**
- Singles/Aromantisch: Mehr Zeit alleine - höheres Bedürfnis nach Allein-Aufladen
- Polyamor: Mehr soziale Kontakte - höhere soziale Energie

---

## TEIL 4: INTIMITÄT

### 4.1 Körperliche Nähe (pr-naehe)

| Bedürfnis | Basis | Beschreibung |
|-----------|-------|--------------|
| koerpernaehe | 55 | Körperliche Nähe allgemein |
| beruehrung | 55 | Berührt werden |
| kuscheln | 55 | Kuscheln und Schmusen |
| physische_distanz | 45 | Physische Distanz wahren |
| koerperkontakt | 55 | Allgemeiner Körperkontakt |
| umarmungen | 60 | Umarmungen |
| hand_halten | 55 | Händchen halten |

#### Archetyp-Deltas für Körperliche Nähe

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| koerpernaehe | -15 | -20 | +10 | -5 | 0 | 0 | +5 | +10 |
| beruehrung | -15 | -20 | +10 | -5 | +5 | 0 | +5 | +10 |
| kuscheln | -15 | -20 | +15 | -5 | +5 | 0 | +10 | +10 |
| physische_distanz | +15 | +20 | -10 | +10 | 0 | +5 | -5 | -5 |

**Quellen:**
- 30% nennen Physical Touch als primäre Liebessprache ([Hims](https://www.hims.com/news/popular-love-languages))
- Aromantisch: Niedrigstes Nähe-Bedürfnis

#### Dominanz-Deltas für Körperliche Nähe

| Bedürfnis | Dominant | Submissiv | Switch | Vanilla |
|-----------|----------|-----------|--------|---------|
| koerpernaehe | +5 | +10 | +10 | +5 |
| beruehrung | +5 | +15 | +10 | +5 |
| kuscheln | 0 | +15 | +10 | +5 |

**Quellen:**
- Submissive berichten höheres Bedürfnis nach Berührung/Kuscheln ([BDSM Research](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5749637/))

---

### 4.2 Sexuelle Frequenz (pr-sex)

| Bedürfnis | Basis | Beschreibung |
|-----------|-------|--------------|
| sexuelle_haeufigkeit | 50 | Gewünschte Sex-Frequenz |
| sexuelle_intimiaet | 55 | Sexuelle Nähe |
| koerperliche_lust | 50 | Körperliches Verlangen |
| sexuelle_experimentierfreude | 45 | Neues ausprobieren |
| sexuelle_verbindung | 55 | Sex als Verbindung |
| sexuelle_zufriedenheit | 60 | Zufriedenheit wichtig |

#### Dominanz-Deltas für Sexualität

| Bedürfnis | Dominant | Submissiv | Switch | Vanilla |
|-----------|----------|-----------|--------|---------|
| sexuelle_haeufigkeit | +10 | +5 | +10 | 0 |
| sexuelle_experimentierfreude | +15 | +15 | +20 | -10 |
| koerperliche_lust | +10 | +10 | +10 | 0 |

**Quellen:**
- BDSM-Praktizierende berichten höhere sexuelle Zufriedenheit ([Wismeijer & van Assen, 2013](https://pubmed.ncbi.nlm.nih.gov/23679066/))
- Switch zeigen höchste Experimentierfreude (Flexibilität)

#### Orientierung-Deltas für Sexualität

| Bedürfnis | Heterosexuell | Homosexuell | Bisexuell |
|-----------|---------------|-------------|-----------|
| sexuelle_experimentierfreude | -5 | +10 | +15 |
| sexuelle_haeufigkeit | 0 | +5 | +5 |

**Quellen:**
- Bisexuelle zeigen höchste Openness to Experience ([Allen et al., 2020](https://pubmed.ncbi.nlm.nih.gov/32510233/))

---

## TEIL 5: WERTE

### 5.1 Religiosität (pr-religion)

| Bedürfnis | Basis | Beschreibung |
|-----------|-------|--------------|
| spiritualitaet | 45 | Spirituelle Orientierung |
| glaubenspraxis | 40 | Religiöse Praxis |
| religioese_gemeinschaft | 40 | Religiöse Gemeinschaft |
| saekularitaet | 55 | Weltliche Orientierung |
| sinnsuche | 55 | Nach Sinn suchen |
| transzendenz | 45 | Transzendente Erfahrungen |

**Regionale Basis-Variation:**
- Europa: Basis -15 (30 statt 45)
- USA: Basis 0 (45)
- Asien: Variabel (Japan: -20, Indien: +30)

#### Orientierung-Deltas für Religiosität

| Bedürfnis | Heterosexuell | Homosexuell | Bisexuell |
|-----------|---------------|-------------|-----------|
| glaubenspraxis | +5 | -10 | -5 |
| religioese_gemeinschaft | +5 | -15 | -10 |
| saekularitaet | -5 | +10 | +5 |

**Quellen:**
- LGBTQ+ weniger religiös aufgrund historischer Konflikte mit Institutionen ([Pew Research](https://www.pewresearch.org/religion/2020/08/13/religious-identity-among-lgbt-adults/))

---

### 5.2 Umweltbewusstsein (pr-umwelt)

| Bedürfnis | Basis | Beschreibung |
|-----------|-------|--------------|
| umweltverantwortung | 55 | Verantwortung für Umwelt |
| nachhaltigkeit | 55 | Nachhaltig leben |
| oekologisches_bewusstsein | 55 | Ökologisches Bewusstsein |
| pragmatismus | 50 | Pragmatischer Umgang |
| klimaschutz | 55 | Klimaschutz wichtig |
| ressourcenschonung | 55 | Ressourcen schonen |

#### Geschlecht-Deltas für Umweltbewusstsein

| Bedürfnis | Mann | Frau | Divers |
|-----------|------|------|--------|
| umweltverantwortung | -5 | +10 | +5 |
| nachhaltigkeit | -5 | +10 | +5 |
| klimaschutz | -5 | +10 | +5 |

**Quellen:**
- Frauen zeigen höheres Umweltbewusstsein in Studien ([PwC 2024](https://www.pwc.com/gx/en/news-room/press-releases/2024/pwc-2024-voice-of-consumer-survey.html))

---

## ZUSAMMENFASSUNG: PROFIL-MODIFIER

### Archetyp-Profil-Tendenzen

| Archetyp | Haupt-Tendenz | Schlüssel-Bedürfnisse ↑ | Schlüssel-Bedürfnisse ↓ |
|----------|---------------|------------------------|------------------------|
| **Single** | Autonomie | eigener_raum, unabhaengigkeit, selbstbestimmung | gemeinsamer_wohnraum, verbindlichkeit, naehe |
| **Aromantisch** | Nicht-romantisch | allein_aufladen, saekularitaet | romantische_gesten, kuscheln, verbindlichkeit |
| **Duo** | Traditionell | verbindlichkeit, nest_bauen, treueversprechen | eigener_raum, unabhaengigkeit |
| **LAT** | Getrennt wohnen | eigener_raum, unabhaengigkeit | gemeinsamer_wohnraum, alltag_teilen |
| **Solopoly** | Solo + Poly | eigene_freunde, soziale_energie, unabhaengigkeit | verbindlichkeit, treueversprechen |
| **RA** | Anarchie | offenheit_fuer_neues, unabhaengigkeit | tradition, verbindlichkeit |
| **Duo-Flex** | Flexibles Duo | langfristige_bindung, nest_bauen | N/A - flexibel |
| **Polyamor** | Multi-Partner | soziale_energie, geselligkeit | treueversprechen, tradition |

### Dominanz-Profil-Tendenzen

| Dominanz | Haupt-Tendenz | Schlüssel-Bedürfnisse ↑ | Schlüssel-Bedürfnisse ↓ |
|----------|---------------|------------------------|------------------------|
| **Dominant** | Führung | verantwortung_uebernehmen, konfliktklaerung, struktur | konflikt_vermeiden, verletzlichkeit |
| **Submissiv** | Hingabe | verletzlichkeit, harmonie, beruehrung | konfliktklaerung, emotionale_zurueckhaltung |
| **Switch** | Flexibel | sexuelle_experimentierfreude, flexibilitaet | N/A - flexibel |
| **Vanilla** | Ausgeglichen | harmonie, emotionale_sicherheit | sexuelle_experimentierfreude |

### Geschlecht-Profil-Tendenzen

| Geschlecht | Haupt-Tendenz | Schlüssel-Bedürfnisse ↑ | Schlüssel-Bedürfnisse ↓ |
|------------|---------------|------------------------|------------------------|
| **Mann** | Aktivität | N/A | emotionale_offenheit, verbale_verbindung |
| **Frau** | Kommunikation | emotionale_offenheit, fuersorge, verbale_verbindung | N/A |
| **Divers** | Authentizität | akzeptanz, identitaet, authentizitaet | tradition |

---

## IMPLEMENTIERUNG: Code-Struktur

```javascript
// profiles/need-defaults.js
const NEED_DEFAULTS = {
    // Basis-Wert (Gaußsche Mitte)
    base: 50,

    // Pro Bedürfnis: Modifikatoren
    kinderwunsch: {
        base: 55,
        archetyp: { single: -20, aromantisch: -25, duo: +15, lat: +5, solopoly: -5, ra: -10, duoflex: +10, polyamor: 0 },
        dominanz: { dominant: 0, submissiv: 0, switch: 0, vanilla: +5 },
        orientierung: { hetero: +5, homo: -10, bi: 0 },
        geschlecht: { mann: -5, frau: +10, divers: 0 }
    },
    // ... weitere Bedürfnisse
};

function calculateNeedDefault(needId, profile) {
    const need = NEED_DEFAULTS[needId];
    if (!need) return 50;

    let value = need.base;
    value += need.archetyp[profile.archetyp] || 0;
    value += need.dominanz[profile.dominanz] || 0;
    value += need.orientierung[profile.orientierung] || 0;
    value += need.geschlecht[profile.geschlecht] || 0;

    // Clamp zwischen 0 und 100
    return Math.max(0, Math.min(100, value));
}
```

---

## QUELLEN

1. [Pew Research - Marriage & Family](https://www.pewresearch.org/social-trends/2014/09/24/chapter-1-public-views-on-marriage/)
2. [Psychology Today - Introversion](https://www.psychologytoday.com/us/blog/people-unexplained/202203/why-almost-no-one-is-100-percent-extraverted-or-introverted)
3. [Hébert & Weaver - BDSM Roles](https://utppublishing.com/doi/abs/10.3138/cjhs.2467)
4. [Wismeijer & van Assen - BDSM Psychology](https://pubmed.ncbi.nlm.nih.gov/23679066/)
5. [Allen et al. - Sexual Orientation & Personality](https://pubmed.ncbi.nlm.nih.gov/32510233/)
6. [Hims - Love Languages Survey](https://www.hims.com/news/popular-love-languages)
7. [Niagara Institute - Conflict Styles](https://www.niagarainstitute.com/blog/workplace-conflict-statistics)
8. [PwC - Consumer Survey 2024](https://www.pwc.com/gx/en/news-room/press-releases/2024/pwc-2024-voice-of-consumer-survey.html)

---

*Letzte Aktualisierung: 2025-12-07*
*Nächste geplante Aktualisierung: 2026-12-07*
