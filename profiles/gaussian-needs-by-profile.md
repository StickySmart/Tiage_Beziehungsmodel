# Gaußsche Verteilung der Bedürfnisse nach Profil-Faktoren

> **Recherche-Datum:** 2025-12-08
> **Nächste geplante Aktualisierung:** 2026-12-07
> **Zweck:** Dynamische Default-Werte basierend auf Profil-Kombination

Dieses Dokument beschreibt, wie jedes der **135 Bedürfnisse** (verteilt auf 22 Kategorien) von den fünf Profil-Faktoren beeinflusst wird:
- **Archetyp** (8): Single, Aromantisch, Duo, LAT, Solopoly, RA, Duo-Flex, Polyamor
- **Dominanz** (4): Dominant, Submissiv, Switch, Vanilla
- **Orientierung** (3): Heterosexuell, Homosexuell, Bisexuell
- **Geschlecht** (3): Mann, Frau, Inter
- **Geschlechtsidentität** (9): Mann-Cis, Mann-Trans, Mann-Suchend, Frau-Cis, Frau-Trans, Frau-Suchend, Inter-Nonbinär, Inter-Fluid, Inter-Suchend

---

## Berechnungsformel

```
Bedürfnis-Default = Basis(50) + Archetyp-Delta + Dominanz-Delta + Orientierung-Delta + Geschlecht-Delta + Identität-Delta
```

Beispiel für "kinderwunsch":
- Basis: 50
- Single: -15 | Duo: +10
- Dominant: +5 | Submissiv: 0
- Heterosexuell: +10 | Homosexuell: -5
- Mann: -5 | Frau: +10
- Mann-Trans: +5 (erhöhter Wunsch nach biologischer Familie)
→ Single + Heterosexuell + Mann + Mann-Trans = 50 - 15 + 10 - 5 + 5 = **45**

---

## TEIL 1: LEBENSPLANUNG

### 1.1 Kinder (pr-kinder)

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| kinderwunsch | 55 | "Wie stark wünschen Sie sich eigene Kinder?" | Wunsch, eigene Kinder zu haben |
| elternschaft | 55 | "Wie wichtig ist es Ihnen, Eltern zu werden?" | Wunsch, Elternrolle zu übernehmen |
| fortpflanzung | 50 | "Wie wichtig ist Ihnen biologische Fortpflanzung?" | Biologischer Fortpflanzungswunsch |
| fuersorge | 55 | "Wie stark ist Ihr Bedürfnis, für andere zu sorgen?" | Für andere sorgen wollen |
| familie_gruenden | 55 | "Wie wichtig ist es Ihnen, eine eigene Familie zu gründen?" | Eigene Familie aufbauen |
| generativitaet | 50 | "Wie wichtig ist es Ihnen, etwas an die nächste Generation weiterzugeben?" | Etwas an nächste Generation weitergeben |
| verantwortung_uebernehmen | 55 | "Wie bereit sind Sie, langfristige Verantwortung zu übernehmen?" | Bereitschaft für Verantwortung |

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

#### Geschlechtsidentität-Deltas für Kinder-Bedürfnisse

| Bedürfnis | Cis | Trans | Suchend | Nonbinär | Fluid |
|-----------|-----|-------|---------|----------|-------|
| kinderwunsch | 0 | -5 | -10 | -10 | -10 |
| fortpflanzung | 0 | -15 | -10 | -15 | -15 |
| elternschaft | 0 | +5 | -5 | 0 | 0 |
| fuersorge | 0 | +5 | 0 | +5 | +5 |

**Begründung:**
- Trans: Biologische Fortpflanzung komplexer (Hormontherapie etc.), aber Elternwunsch oft stark
- Suchend: In Identitätsfindung, Familienplanung oft aufgeschoben
- Nonbinär/Fluid: Komplexere Beziehung zu traditionellen Familienmodellen

**Quellen:**
- Trans-Personen: 38% wünschen sich Kinder ([Family Equality](https://www.familyequality.org/))
- Reproduktive Optionen für Trans-Personen sind begrenzt aber wachsend

---

### 1.2 Ehe (pr-ehe)

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| verbindlichkeit | 50 | "Wie wichtig ist Ihnen ein verbindliches Beziehungsversprechen?" | Wunsch nach fester Zusage |
| langfristige_bindung | 55 | "Wie wichtig ist Ihnen eine langfristige, dauerhafte Beziehung?" | Langfristige Beziehung anstreben |
| rechtliche_sicherheit | 45 | "Wie wichtig ist Ihnen rechtliche Absicherung durch Ehe?" | Rechtliche Absicherung wichtig |
| gesellschaftliche_anerkennung | 40 | "Wie wichtig ist Ihnen die gesellschaftliche Anerkennung Ihrer Beziehung?" | Soziale Anerkennung der Beziehung |
| tradition | 45 | "Wie wichtig sind Ihnen traditionelle Ehe-Werte?" | Traditionelle Ehe-Werte |
| treueversprechen | 55 | "Wie wichtig ist Ihnen ein gegenseitiges Treueversprechen?" | Gegenseitiges Treueversprechen |

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

#### Geschlechtsidentität-Deltas für Ehe-Bedürfnisse

| Bedürfnis | Cis | Trans | Suchend | Nonbinär | Fluid |
|-----------|-----|-------|---------|----------|-------|
| rechtliche_sicherheit | 0 | +10 | -5 | 0 | 0 |
| gesellschaftliche_anerkennung | 0 | +5 | -10 | -10 | -10 |
| tradition | 0 | -5 | -10 | -15 | -15 |

**Begründung:**
- Trans: Höherer Wert auf rechtliche Sicherheit (Absicherung bei Diskriminierung)
- Nonbinär/Fluid: Weniger Affinität zu traditionellen Ehe-Normen

---

### 1.3 Zusammenwohnen (pr-zusammen)

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| gemeinsamer_wohnraum | 55 | "Wie wichtig ist es Ihnen, mit Ihrem Partner zusammenzuwohnen?" | Zusammen wohnen wollen |
| haeuslichkeit | 50 | "Wie wichtig ist Ihnen eine gemütliche, häusliche Atmosphäre?" | Häusliche Atmosphäre schätzen |
| nest_bauen | 55 | "Wie wichtig ist es Ihnen, ein gemeinsames Zuhause aufzubauen?" | Gemeinsames Zuhause aufbauen |
| alltag_teilen | 55 | "Wie wichtig ist es Ihnen, den Alltag mit Ihrem Partner zu teilen?" | Tägliches Leben teilen |
| naehe | 55 | "Wie wichtig ist Ihnen räumliche Nähe zu Ihrem Partner?" | Räumliche Nähe zum Partner |
| eigener_raum | 50 | "Wie wichtig ist es Ihnen, einen eigenen Bereich/Raum zu haben?" | Eigenen Bereich haben |
| rueckzugsort | 55 | "Wie wichtig ist Ihnen eine Rückzugsmöglichkeit für sich allein?" | Rückzugsmöglichkeit haben |

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

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| taeglicher_austausch | 50 | "Wie wichtig ist Ihnen täglicher verbaler Austausch mit Ihrem Partner?" | Tägliche Kommunikation |
| tiefgehende_gespraeche | 55 | "Wie wichtig sind Ihnen tiefgehende, bedeutungsvolle Gespräche?" | Bedeutungsvolle Gespräche |
| small_talk | 45 | "Wie wohl fühlen Sie sich mit leichter, alltäglicher Unterhaltung?" | Leichte Unterhaltung |
| stille_gemeinsam | 50 | "Wie wohl fühlen Sie sich in gemeinsamer Stille mit Ihrem Partner?" | Gemeinsame Stille genießen |
| verbale_verbindung | 55 | "Wie wichtig ist es Ihnen, sich durch Worte zu verbinden?" | Durch Worte verbinden |
| zuhoeren | 60 | "Wie wichtig ist es Ihnen, dass Ihr Partner Ihnen aktiv zuhört?" | Aktiv zuhören |

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

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| emotionale_offenheit | 50 | "Wie offen zeigen Sie Ihre Gefühle gegenüber Ihrem Partner?" | Gefühle offen zeigen |
| gefuehle_zeigen | 50 | "Wie wichtig ist es Ihnen, Emotionen offen auszudrücken?" | Emotionen ausdrücken |
| verletzlichkeit | 45 | "Wie wohl fühlen Sie sich, sich verletzlich zu zeigen?" | Sich verletzlich zeigen |
| emotionale_zurueckhaltung | 50 | "Wie stark neigen Sie dazu, Gefühle zurückzuhalten?" | Gefühle zurückhalten |
| emotionale_sicherheit | 60 | "Wie wichtig ist Ihnen ein emotionales Sicherheitsgefühl in der Beziehung?" | Sicherheit für Emotionen |
| gefuehle_teilen | 55 | "Wie wichtig ist es Ihnen, Gefühle mit Ihrem Partner zu teilen?" | Gefühle miteinander teilen |

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

#### Geschlechtsidentität-Deltas für Emotionale Offenheit

| Bedürfnis | Cis | Trans | Suchend | Nonbinär | Fluid |
|-----------|-----|-------|---------|----------|-------|
| emotionale_offenheit | 0 | +10 | +5 | +10 | +10 |
| gefuehle_zeigen | 0 | +10 | +5 | +10 | +10 |
| verletzlichkeit | 0 | +10 | +10 | +10 | +10 |
| emotionale_sicherheit | 0 | +15 | +10 | +10 | +10 |

**Begründung:**
- Trans: Signifikant höhere Selbstreflexion und Kommunikationsfähigkeit durch Transition (Reigeluth & Addis, 2021)
- Suchend/Nonbinär/Fluid: Höheres Bedürfnis nach emotionaler Sicherheit und Akzeptanz

**Quellen:**
- Trans-Personen zeigen verbesserte Kommunikationsfähigkeiten ([Iantaffi & Bockting, 2011](https://pmc.ncbi.nlm.nih.gov/articles/PMC3076785/))
- Resilienz durch Überwindung von Identitäts-Herausforderungen

---

### 2.3 Konfliktverhalten (pr-konflikt)

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| konfliktklaerung | 55 | "Wie wichtig ist es Ihnen, Konflikte aktiv anzusprechen und zu klären?" | Konflikte aktiv klären |
| harmonie | 55 | "Wie wichtig ist Ihnen ein harmonisches Miteinander?" | Harmonisches Miteinander |
| aussprache | 55 | "Wie wichtig ist es Ihnen, Dinge offen auszusprechen?" | Dinge aussprechen |
| konflikt_vermeiden | 45 | "Wie stark neigen Sie dazu, Konflikte zu vermeiden?" | Konflikte meiden |
| streitkultur | 50 | "Wie wichtig ist Ihnen eine konstruktive Streitkultur?" | Konstruktiv streiten |
| versoehnlichkeit | 60 | "Wie wichtig ist Ihnen, sich nach einem Streit schnell zu versöhnen?" | Sich versöhnen können |

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

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| soziale_energie | 50 | "Wie viel Energie ziehen Sie aus sozialen Kontakten?" | Energie aus sozialem Kontakt |
| geselligkeit | 50 | "Wie gerne sind Sie unter Menschen?" | Gerne unter Menschen |
| ruhe_von_menschen | 50 | "Wie stark brauchen Sie Ruhe von anderen Menschen?" | Ruhe von Menschen brauchen |
| allein_aufladen | 50 | "Wie wichtig ist es Ihnen, alleine Energie zu tanken?" | Alleine Energie tanken |
| menschen_treffen | 50 | "Wie wichtig ist es Ihnen, regelmäßig Menschen zu treffen?" | Menschen treffen wollen |
| kleine_gruppen | 55 | "Wie stark bevorzugen Sie kleine Gruppen gegenüber großen?" | Kleine Gruppen bevorzugen |

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

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| koerpernaehe | 55 | "Wie wichtig ist Ihnen körperliche Nähe zu Ihrem Partner?" | Körperliche Nähe allgemein |
| beruehrung | 55 | "Wie wichtig ist es Ihnen, von Ihrem Partner berührt zu werden?" | Berührt werden |
| kuscheln | 55 | "Wie wichtig ist Ihnen regelmäßiges Kuscheln?" | Kuscheln und Schmusen |
| physische_distanz | 45 | "Wie wichtig ist es Ihnen, physische Distanz wahren zu können?" | Physische Distanz wahren |
| koerperkontakt | 55 | "Wie wichtig ist Ihnen allgemeiner Körperkontakt im Alltag?" | Allgemeiner Körperkontakt |
| umarmungen | 60 | "Wie wichtig sind Ihnen regelmäßige Umarmungen?" | Umarmungen |
| hand_halten | 55 | "Wie wichtig ist es Ihnen, Händchen zu halten?" | Händchen halten |

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

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| sexuelle_haeufigkeit | 50 | "Wie häufig wünschen Sie sich sexuelle Intimität?" | Gewünschte Sex-Frequenz |
| sexuelle_intimiaet | 55 | "Wie wichtig ist Ihnen sexuelle Nähe in einer Beziehung?" | Sexuelle Nähe |
| koerperliche_lust | 50 | "Wie stark ist Ihr körperliches Verlangen typischerweise?" | Körperliches Verlangen |
| sexuelle_experimentierfreude | 45 | "Wie offen sind Sie, sexuell Neues auszuprobieren?" | Neues ausprobieren |
| sexuelle_verbindung | 55 | "Wie wichtig ist Sex als emotionale Verbindung für Sie?" | Sex als Verbindung |
| sexuelle_zufriedenheit | 60 | "Wie wichtig ist Ihnen sexuelle Zufriedenheit in der Beziehung?" | Zufriedenheit wichtig |

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

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| spiritualitaet | 45 | "Wie wichtig ist Ihnen Spiritualität in Ihrem Leben?" | Spirituelle Orientierung |
| glaubenspraxis | 40 | "Wie wichtig ist Ihnen aktive religiöse Praxis (Beten, Gottesdienst)?" | Religiöse Praxis |
| religioese_gemeinschaft | 40 | "Wie wichtig ist Ihnen eine religiöse Gemeinschaft?" | Religiöse Gemeinschaft |
| saekularitaet | 55 | "Wie wichtig ist Ihnen ein weltlicher, nicht-religiöser Lebensstil?" | Weltliche Orientierung |
| sinnsuche | 55 | "Wie wichtig ist es Ihnen, nach dem Sinn des Lebens zu suchen?" | Nach Sinn suchen |
| transzendenz | 45 | "Wie wichtig sind Ihnen transzendente/spirituelle Erfahrungen?" | Transzendente Erfahrungen |

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

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| umweltverantwortung | 55 | "Wie wichtig ist Ihnen persönliche Verantwortung für die Umwelt?" | Verantwortung für Umwelt |
| nachhaltigkeit | 55 | "Wie wichtig ist es Ihnen, nachhaltig zu leben?" | Nachhaltig leben |
| oekologisches_bewusstsein | 55 | "Wie ausgeprägt ist Ihr ökologisches Bewusstsein?" | Ökologisches Bewusstsein |
| pragmatismus | 50 | "Wie pragmatisch gehen Sie mit Umweltthemen um?" | Pragmatischer Umgang |
| klimaschutz | 55 | "Wie wichtig ist Ihnen aktiver Klimaschutz?" | Klimaschutz wichtig |
| ressourcenschonung | 55 | "Wie wichtig ist Ihnen Ressourcenschonung im Alltag?" | Ressourcen schonen |

#### Geschlecht-Deltas für Umweltbewusstsein

| Bedürfnis | Mann | Frau | Divers |
|-----------|------|------|--------|
| umweltverantwortung | -5 | +10 | +5 |
| nachhaltigkeit | -5 | +10 | +5 |
| klimaschutz | -5 | +10 | +5 |

**Quellen:**
- Frauen zeigen höheres Umweltbewusstsein in Studien ([PwC 2024](https://www.pwc.com/gx/en/news-room/press-releases/2024/pwc-2024-voice-of-consumer-survey.html))

---

### 5.3 Tradition (pr-tradition)

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| traditionsbewusstsein | 45 | "Wie wichtig sind Ihnen traditionelle Werte und Bräuche?" | Traditionelle Werte schätzen |
| konservative_werte | 45 | "Wie stark identifizieren Sie sich mit konservativen Werten?" | Konservative Einstellung |
| moderne_werte | 55 | "Wie offen sind Sie für moderne, progressive Werte?" | Progressive Einstellung |
| kulturelle_tradition | 50 | "Wie wichtig ist Ihnen die Pflege kultureller Traditionen?" | Kulturelle Traditionen |
| familienbräuche | 50 | "Wie wichtig sind Ihnen Familienbräuche und -rituale?" | Familienbräuche |
| gesellschaftliche_normen | 45 | "Wie wichtig ist Ihnen die Einhaltung gesellschaftlicher Normen?" | Gesellschaftliche Normen |

#### Archetyp-Deltas für Tradition

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| traditionsbewusstsein | -5 | -10 | +15 | 0 | -15 | -20 | +5 | -10 |
| konservative_werte | -5 | -10 | +15 | 0 | -20 | -25 | +5 | -15 |
| moderne_werte | +5 | +10 | -10 | +5 | +20 | +25 | 0 | +15 |
| kulturelle_tradition | 0 | -5 | +10 | +5 | -10 | -15 | +5 | -5 |
| familienbräuche | -10 | -15 | +15 | 0 | -10 | -15 | +10 | -5 |
| gesellschaftliche_normen | -5 | -15 | +15 | 0 | -20 | -25 | +5 | -15 |

#### Orientierung-Deltas für Tradition

| Bedürfnis | Heterosexuell | Homosexuell | Bisexuell |
|-----------|---------------|-------------|-----------|
| traditionsbewusstsein | +5 | -10 | -5 |
| konservative_werte | +5 | -15 | -10 |
| moderne_werte | -5 | +15 | +10 |
| gesellschaftliche_normen | +5 | -10 | -5 |

**Begründung:**
- RA/Polyamor/Solopoly: Leben außerhalb traditioneller Beziehungsnormen
- Duo: Traditionellstes Beziehungsmodell
- LGBTQ+: Historisch weniger in traditionellen Strukturen verankert

#### Geschlechtsidentität-Deltas für Tradition

| Bedürfnis | Cis | Trans | Suchend | Nonbinär | Fluid |
|-----------|-----|-------|---------|----------|-------|
| traditionsbewusstsein | +5 | -10 | -15 | -20 | -20 |
| konservative_werte | +5 | -15 | -15 | -25 | -25 |
| moderne_werte | -5 | +15 | +15 | +25 | +25 |
| gesellschaftliche_normen | +5 | -10 | -15 | -20 | -20 |

**Begründung:**
- Trans/Nonbinär/Fluid: Leben per Definition außerhalb traditioneller Gender-Normen
- Cis: Höhere Affinität zu bestehenden gesellschaftlichen Strukturen

**Quellen:**
- 21% der Deutschen identifizieren sich als konservativer, 15% als progressiver ([Statista Consumer Insights](https://de.statista.com/infografik/33429/umfrage-zum-wertewandel-in-verschiedenen-laendern/))

---

## TEIL 6: PRAKTISCHES

### 6.1 Haustiere (pr-haustiere)

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| tierhaltung | 50 | "Wie wichtig ist es Ihnen, Haustiere zu haben?" | Wunsch nach Haustieren |
| tierliebe | 55 | "Wie ausgeprägt ist Ihre Tierliebe?" | Liebe zu Tieren |
| verantwortung_tiere | 50 | "Wie bereit sind Sie, Verantwortung für Tiere zu übernehmen?" | Verantwortung für Tiere |
| tier_mensch_bindung | 55 | "Wie wichtig ist Ihnen eine enge Bindung zu Haustieren?" | Bindung zu Tieren |
| allergie_toleranz | 50 | "Wie tolerant sind Sie gegenüber Tierallergien/Tierhaltung anderer?" | Toleranz |
| tierfreier_haushalt | 45 | "Wie wichtig ist Ihnen ein tierfreier Haushalt?" | Keine Tiere gewünscht |

#### Geschlecht-Deltas für Haustiere

| Bedürfnis | Mann | Frau | Divers |
|-----------|------|------|--------|
| tierhaltung | -5 | +10 | 0 |
| tierliebe | -10 | +10 | 0 |
| tier_mensch_bindung | -10 | +10 | 0 |
| tierfreier_haushalt | +5 | -10 | 0 |

#### Archetyp-Deltas für Haustiere

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| tierhaltung | +5 | +10 | +5 | -5 | 0 | 0 | +5 | 0 |
| tierliebe | +5 | +10 | +5 | 0 | +5 | +5 | +5 | +5 |
| verantwortung_tiere | 0 | +5 | +10 | -10 | -5 | -5 | +5 | -5 |
| tierfreier_haushalt | -5 | -10 | -5 | +10 | +5 | +5 | -5 | +5 |

**Begründung:**
- Single/Aromantisch: Haustiere oft als Partnerersatz/Begleiter
- LAT: Getrennte Haushalte erschweren Tierhaltung
- Frauen zeigen höhere Tieraffinität in Studien

**Quellen:**
- 44% der deutschen Haushalte haben Haustiere ([IVH/ZZF 2024](https://www.zzf.de/presse/meldungen/artikel/news/heimtierpopulation-2023))
- 98% sagen Haustiere machen glücklich ([Uelzener 2024](https://www.presseportal.de/pm/174913/5833365))

---

### 6.2 Umzugsbereitschaft (pr-umzug)

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| ortsgebundenheit | 50 | "Wie stark fühlen Sie sich an Ihren aktuellen Wohnort gebunden?" | Bindung an Wohnort |
| umzugsbereitschaft | 50 | "Wie bereit wären Sie, für eine Beziehung umzuziehen?" | Bereitschaft umzuziehen |
| fernbeziehung_toleranz | 45 | "Wie tolerant wären Sie gegenüber einer Fernbeziehung?" | Fernbeziehung akzeptieren |
| flexibilitaet_wohnort | 50 | "Wie flexibel sind Sie bezüglich Ihres Wohnortes?" | Wohnort-Flexibilität |
| heimatverbundenheit | 55 | "Wie stark ist Ihre Heimatverbundenheit?" | Verbundenheit zur Heimat |
| abenteuer_neuer_ort | 45 | "Wie offen sind Sie für einen Neuanfang an einem neuen Ort?" | Offenheit für Neues |

#### Archetyp-Deltas für Umzugsbereitschaft

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| ortsgebundenheit | +5 | +5 | +10 | -5 | -10 | -10 | 0 | -5 |
| umzugsbereitschaft | -10 | -15 | +15 | +10 | +5 | +10 | +10 | +5 |
| fernbeziehung_toleranz | -5 | 0 | -10 | +20 | +15 | +15 | +5 | +10 |
| flexibilitaet_wohnort | 0 | 0 | +5 | +10 | +15 | +15 | +5 | +10 |
| heimatverbundenheit | +10 | +10 | +10 | -5 | -10 | -10 | +5 | -5 |
| abenteuer_neuer_ort | -5 | -5 | +5 | +10 | +15 | +15 | +5 | +10 |

#### Geschlecht-Deltas für Umzugsbereitschaft

| Bedürfnis | Mann | Frau | Divers |
|-----------|------|------|--------|
| umzugsbereitschaft | -5 | +5 | 0 |
| heimatverbundenheit | -5 | +5 | 0 |

**Begründung:**
- LAT: Fernbeziehung ist das Modell - höchste Toleranz
- RA/Solopoly: Flexibler in Wohnort-Entscheidungen
- Duo: Bereitschaft umzuziehen für gemeinsames Leben
- Single: Weniger Anreiz für Umzug wegen Beziehung

**Quellen:**
- 70% würden innerhalb Deutschlands für die Liebe umziehen ([Immowelt](https://www.umzugspreisvergleich.de/presse/liebe-schlaegt-karriere-die-deutschen-ziehen-vor-allem-wegen-dem-partner-um/))
- 59% sind schon mal für den Partner umgezogen

---

### 6.3 Herkunftsfamilie (pr-familie)

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| familienkontakt | 55 | "Wie wichtig ist Ihnen regelmäßiger Kontakt zu Ihrer Herkunftsfamilie?" | Kontakt zur Familie |
| familiennaehe | 55 | "Wie wichtig ist Ihnen räumliche Nähe zu Ihrer Familie?" | Nähe zur Familie |
| familienfeste | 50 | "Wie wichtig sind Ihnen gemeinsame Familienfeste?" | Familienfeste |
| elternbeziehung | 55 | "Wie wichtig ist Ihnen eine gute Beziehung zu Ihren Eltern?" | Beziehung zu Eltern |
| geschwisterbeziehung | 50 | "Wie wichtig ist Ihnen die Beziehung zu Ihren Geschwistern?" | Beziehung zu Geschwistern |
| familienunabhaengigkeit | 50 | "Wie wichtig ist Ihnen Unabhängigkeit von Ihrer Familie?" | Unabhängigkeit |

#### Archetyp-Deltas für Herkunftsfamilie

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| familienkontakt | +5 | -5 | +10 | +5 | -5 | -10 | +5 | -5 |
| familiennaehe | +5 | -5 | +10 | 0 | -10 | -15 | +5 | -10 |
| familienfeste | 0 | -10 | +15 | +5 | -5 | -10 | +10 | -5 |
| elternbeziehung | +5 | -5 | +10 | +5 | -5 | -10 | +5 | -5 |
| geschwisterbeziehung | +5 | 0 | +5 | +5 | 0 | -5 | +5 | 0 |
| familienunabhaengigkeit | -5 | +15 | -10 | 0 | +15 | +20 | -5 | +10 |

#### Orientierung-Deltas für Herkunftsfamilie

| Bedürfnis | Heterosexuell | Homosexuell | Bisexuell |
|-----------|---------------|-------------|-----------|
| familienkontakt | +5 | -10 | -5 |
| familiennaehe | +5 | -10 | -5 |
| familienunabhaengigkeit | -5 | +10 | +5 |

**Begründung:**
- Duo: Traditionell starke Familienorientierung
- RA: Höchste Unabhängigkeit von Herkunftsfamilie
- LGBTQ+: Oft komplizierte Familienbeziehungen (Akzeptanz-Thematik)
- Single: Oft engerer Kontakt zur Herkunftsfamilie

**Quellen:**
- 56 Mio. Deutsche halten Familie für besonders wichtig ([Statista/Allensbach](https://de.statista.com/statistik/daten/studie/173267/umfrage/lebenseinstellung-wert-der-familie/))

---

### 6.4 Finanzen (pr-finanzen)

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| finanzielle_transparenz | 55 | "Wie wichtig ist Ihnen finanzielle Transparenz in der Beziehung?" | Offenheit über Finanzen |
| gemeinsame_finanzen | 45 | "Wie wichtig ist Ihnen ein gemeinsames Konto/Finanzen?" | Gemeinsame Finanzen |
| getrennte_finanzen | 50 | "Wie wichtig ist es Ihnen, getrennte Finanzen zu haben?" | Getrennte Finanzen |
| finanzielle_sicherheit | 60 | "Wie wichtig ist Ihnen finanzielle Sicherheit?" | Finanzielle Sicherheit |
| sparsamkeit | 50 | "Wie sparsam sind Sie im Alltag?" | Sparsamkeit |
| grosszuegigkeit | 50 | "Wie großzügig sind Sie mit Geld?" | Großzügigkeit |

#### Archetyp-Deltas für Finanzen

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| finanzielle_transparenz | -15 | -20 | +15 | +5 | 0 | -5 | +10 | 0 |
| gemeinsame_finanzen | -25 | -30 | +20 | -15 | -20 | -25 | +10 | -10 |
| getrennte_finanzen | +20 | +25 | -15 | +15 | +20 | +25 | -5 | +15 |
| finanzielle_sicherheit | 0 | 0 | +10 | +5 | 0 | -5 | +5 | 0 |
| sparsamkeit | +5 | +5 | +5 | 0 | 0 | 0 | +5 | 0 |
| grosszuegigkeit | -5 | -5 | +5 | 0 | +5 | +5 | +5 | +5 |

#### Geschlecht-Deltas für Finanzen

| Bedürfnis | Mann | Frau | Divers |
|-----------|------|------|--------|
| finanzielle_sicherheit | -5 | +10 | 0 |
| gemeinsame_finanzen | -5 | +5 | 0 |
| getrennte_finanzen | +5 | -5 | 0 |

**Begründung:**
- Duo: Höchste Bereitschaft für gemeinsame Finanzen
- Single/Aromantisch/RA: Getrennte Finanzen als Standard
- LAT: Getrennte Haushalte = getrennte Finanzen
- Frauen: Höheres Sicherheitsbedürfnis (Gender Pay Gap, Altersarmut)

**Quellen:**
- 45% der Paare haben getrennte Konten, 33% gemeinsam, 18% Drei-Konten-Modell ([Postbank 2023](https://www.postbank.de/unternehmen/medien/meldungen/2023/maerz/lieber-getrennt-so-organisieren-paare-ihre-bankkonten.html))
- 39% der Paare streiten über Geld

---

### 6.5 Karriere (pr-karriere)

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| karriereorientierung | 50 | "Wie wichtig ist Ihnen beruflicher Erfolg?" | Beruflicher Erfolg |
| work_life_balance | 60 | "Wie wichtig ist Ihnen eine gute Work-Life-Balance?" | Work-Life-Balance |
| berufliche_selbstverwirklichung | 55 | "Wie wichtig ist Ihnen berufliche Selbstverwirklichung?" | Selbstverwirklichung |
| familie_vor_karriere | 55 | "Wie stark priorisieren Sie Familie vor Karriere?" | Familie priorisieren |
| karriere_vor_familie | 40 | "Wie stark priorisieren Sie Karriere vor Familie?" | Karriere priorisieren |
| berufliche_flexibilitaet | 55 | "Wie wichtig ist Ihnen berufliche Flexibilität?" | Berufliche Flexibilität |

#### Geschlecht-Deltas für Karriere

| Bedürfnis | Mann | Frau | Divers |
|-----------|------|------|--------|
| karriereorientierung | +10 | -5 | 0 |
| work_life_balance | -5 | +10 | +5 |
| familie_vor_karriere | -10 | +15 | 0 |
| karriere_vor_familie | +10 | -10 | 0 |

#### Archetyp-Deltas für Karriere

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| karriereorientierung | +10 | +10 | -5 | +5 | +5 | +5 | 0 | 0 |
| work_life_balance | -5 | -5 | +10 | +5 | 0 | +5 | +5 | +5 |
| berufliche_selbstverwirklichung | +5 | +10 | 0 | +5 | +10 | +10 | +5 | +5 |
| familie_vor_karriere | -15 | -20 | +15 | +5 | -5 | -10 | +10 | 0 |
| karriere_vor_familie | +15 | +20 | -10 | 0 | +10 | +10 | -5 | +5 |
| berufliche_flexibilitaet | +5 | +5 | 0 | +10 | +10 | +15 | +5 | +10 |

**Begründung:**
- Single/Aromantisch: Karrierefokus ohne Familienverpflichtungen
- Duo: Stärkste Familie-vor-Karriere-Orientierung
- RA/Solopoly: Hohe Wertschätzung für Selbstverwirklichung und Flexibilität
- Geschlecht: Traditionelle Rollenbilder noch wirksam

**Quellen:**
- 38% der Deutschen sind mit ihrer Work-Life-Balance zufrieden ([t3n 2023](https://t3n.de/news/work-life-balance-unzufrieden-umfrage-1562380/))
- 86% der Arbeitgeber legen Wert auf Familienfreundlichkeit

---

### 6.6 Alleinzeit (pr-alleinzeit)

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| zeit_fuer_sich | 55 | "Wie wichtig ist Ihnen Zeit nur für sich selbst?" | Zeit für sich |
| me_time | 55 | "Wie wichtig ist Ihnen regelmäßige Me-Time?" | Me-Time |
| raum_fuer_hobbys | 55 | "Wie wichtig ist Ihnen Raum für eigene Hobbys?" | Raum für Hobbys |
| ungestoerte_zeit | 50 | "Wie wichtig ist Ihnen ungestörte Zeit?" | Ungestörte Zeit |
| gemeinsame_zeit | 55 | "Wie wichtig ist Ihnen gemeinsame Zeit mit dem Partner?" | Gemeinsame Zeit |
| balance_allein_zusammen | 55 | "Wie wichtig ist Ihnen eine Balance zwischen Allein- und Paarzeit?" | Balance |

#### Archetyp-Deltas für Alleinzeit

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| zeit_fuer_sich | +15 | +20 | -10 | +10 | +15 | +20 | 0 | +5 |
| me_time | +15 | +20 | -10 | +10 | +15 | +20 | 0 | +5 |
| raum_fuer_hobbys | +10 | +15 | -5 | +10 | +15 | +15 | +5 | +10 |
| ungestoerte_zeit | +10 | +15 | -5 | +10 | +10 | +15 | 0 | +5 |
| gemeinsame_zeit | -20 | -25 | +15 | -5 | -5 | -10 | +10 | +5 |
| balance_allein_zusammen | -5 | -10 | +10 | +10 | +5 | +5 | +10 | +5 |

#### Dominanz-Deltas für Alleinzeit

| Bedürfnis | Dominant | Submissiv | Switch | Vanilla |
|-----------|----------|-----------|--------|---------|
| zeit_fuer_sich | +5 | -5 | 0 | 0 |
| me_time | +5 | -5 | 0 | 0 |
| gemeinsame_zeit | -5 | +10 | 0 | +5 |

**Begründung:**
- Single/Aromantisch/RA: Höchstes Bedürfnis nach Alleinzeit
- Duo: Stärkste Präferenz für gemeinsame Zeit
- LAT: Balance durch räumliche Trennung
- Dominant: Mehr Bedürfnis nach eigenem Raum

**Quellen:**
- 72% haben genug Me-Time, 28% zu wenig ([EARSandEYES 2023](https://www.earsandeyes.com/blog/zeit-fur-sich-ist-faulpelz-sein-wirklich-so-schlimm/))
- 40% haben täglich weniger als 45 Minuten Zeit für sich

---

### 6.7 Freunde (pr-freunde)

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| eigene_freunde | 55 | "Wie wichtig sind Ihnen eigene, unabhängige Freundschaften?" | Eigene Freundschaften |
| gemeinsame_freunde | 50 | "Wie wichtig sind Ihnen gemeinsame Freunde als Paar?" | Gemeinsame Freunde |
| freundschaftspflege | 55 | "Wie wichtig ist Ihnen die Pflege von Freundschaften?" | Freundschaften pflegen |
| freundeskreis_integration | 50 | "Wie wichtig ist Ihnen, dass Ihr Partner in Ihren Freundeskreis integriert ist?" | Integration Partner |
| soziales_netzwerk | 55 | "Wie wichtig ist Ihnen ein breites soziales Netzwerk?" | Soziales Netzwerk |
| beste_freunde | 55 | "Wie wichtig sind Ihnen enge, beste Freundschaften?" | Beste Freunde |

#### Geschlecht-Deltas für Freunde

| Bedürfnis | Mann | Frau | Divers |
|-----------|------|------|--------|
| eigene_freunde | -5 | +10 | +5 |
| freundschaftspflege | -10 | +10 | +5 |
| soziales_netzwerk | -5 | +5 | +5 |
| beste_freunde | -5 | +10 | +5 |

#### Archetyp-Deltas für Freunde

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| eigene_freunde | +10 | +15 | -5 | +10 | +15 | +20 | +5 | +10 |
| gemeinsame_freunde | -15 | -20 | +15 | +5 | +5 | -5 | +10 | +10 |
| freundschaftspflege | +5 | +10 | 0 | +5 | +10 | +15 | +5 | +10 |
| freundeskreis_integration | -15 | -20 | +15 | +5 | +5 | -5 | +10 | +10 |
| soziales_netzwerk | +5 | +5 | 0 | +5 | +15 | +15 | +5 | +15 |
| beste_freunde | +10 | +15 | 0 | +5 | +10 | +15 | +5 | +10 |

**Begründung:**
- Single/Aromantisch: Freundschaften als primäres soziales Netz
- RA/Solopoly/Polyamor: Breites soziales Netzwerk wichtig
- Duo: Stärkste Präferenz für gemeinsame Freunde
- Frauen: Höhere Investition in Freundschaftspflege

**Quellen:**
- 68% der Frauen wollen unabhängige Freundschaften, 57% der Männer ([ElitePartner 2024](https://www.elitepartner.de/studien/freundschaft-und-beziehung/))
- Deutsche haben im Schnitt 3,7 enge Freunde

---

### 6.8 Romantik (pr-romantik)

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| romantische_gesten | 55 | "Wie wichtig sind Ihnen romantische Gesten?" | Romantische Gesten |
| ueberraschungen | 50 | "Wie wichtig sind Ihnen Überraschungen in der Beziehung?" | Überraschungen |
| date_nights | 55 | "Wie wichtig sind Ihnen regelmäßige Date-Nights?" | Date-Nights |
| liebesbekundungen | 55 | "Wie wichtig sind Ihnen verbale Liebesbekundungen?" | Liebesbekundungen |
| romantische_atmosphaere | 50 | "Wie wichtig ist Ihnen eine romantische Atmosphäre?" | Romantische Atmosphäre |
| alltags_romantik | 50 | "Wie wichtig ist Ihnen Romantik im Alltag?" | Alltags-Romantik |

#### Archetyp-Deltas für Romantik

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| romantische_gesten | -10 | -30 | +15 | +10 | 0 | -15 | +10 | +5 |
| ueberraschungen | -5 | -20 | +10 | +10 | +5 | -10 | +10 | +10 |
| date_nights | -15 | -25 | +15 | +15 | +5 | -10 | +10 | +10 |
| liebesbekundungen | -10 | -30 | +15 | +10 | 0 | -15 | +10 | +5 |
| romantische_atmosphaere | -10 | -25 | +15 | +10 | 0 | -15 | +10 | +5 |
| alltags_romantik | -10 | -25 | +15 | +5 | 0 | -15 | +10 | +5 |

#### Geschlecht-Deltas für Romantik

| Bedürfnis | Mann | Frau | Divers |
|-----------|------|------|--------|
| romantische_gesten | -5 | +10 | 0 |
| liebesbekundungen | -5 | +10 | 0 |
| romantische_atmosphaere | -10 | +10 | 0 |
| date_nights | -5 | +5 | 0 |

**Begründung:**
- Aromantisch: Per Definition wenig/kein romantisches Interesse
- Duo: Höchste Romantik-Orientierung
- RA: Lehnt oft romantische Normen ab
- LAT: Date-Nights besonders wichtig bei getrenntem Wohnen
- Frauen: Höhere Romantik-Erwartungen (sozialisiert)

**Quellen:**
- 70% der Deutschen glauben an Liebe auf den ersten Blick ([Statista](https://de.statista.com/themen/142/liebe/))
- 24% sagen ihr Partner ist absolut romantisch

---

### 6.9 Ordnung (pr-ordnung)

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| ordnungssinn | 55 | "Wie wichtig ist Ihnen Ordnung im Haushalt?" | Ordnung im Haushalt |
| sauberkeit | 55 | "Wie wichtig ist Ihnen Sauberkeit?" | Sauberkeit |
| struktur | 50 | "Wie wichtig ist Ihnen Struktur im Alltag?" | Struktur im Alltag |
| chaos_toleranz | 45 | "Wie tolerant sind Sie gegenüber Unordnung?" | Toleranz für Unordnung |
| putzen | 50 | "Wie wichtig ist Ihnen regelmäßiges Putzen?" | Regelmäßiges Putzen |
| aufgabenteilung_haushalt | 55 | "Wie wichtig ist Ihnen eine faire Haushaltsaufteilung?" | Faire Aufgabenteilung |

#### Geschlecht-Deltas für Ordnung

| Bedürfnis | Mann | Frau | Divers |
|-----------|------|------|--------|
| ordnungssinn | -10 | +10 | 0 |
| sauberkeit | -10 | +10 | 0 |
| putzen | -15 | +10 | 0 |
| aufgabenteilung_haushalt | -10 | +15 | +5 |
| chaos_toleranz | +10 | -10 | 0 |

#### Archetyp-Deltas für Ordnung

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| ordnungssinn | 0 | 0 | +5 | 0 | -5 | -5 | +5 | -5 |
| sauberkeit | 0 | 0 | +5 | 0 | -5 | -5 | +5 | -5 |
| struktur | +5 | +5 | +10 | 0 | -5 | -10 | +5 | -5 |
| aufgabenteilung_haushalt | -10 | -15 | +15 | +5 | +5 | -5 | +10 | +5 |

**Begründung:**
- Duo: Höchste Relevanz von Haushaltsthemen (Zusammenwohnen)
- RA/Solopoly: Weniger konventionelle Haushaltsstrukturen
- Frauen: Traditionell höhere Haushalts-Verantwortung (sozialisiert)
- Single: Keine Abstimmung mit Partner nötig

**Quellen:**
- 96% halten Sauberkeit für wichtig, 75% sagen Ordnung ist sehr wichtig ([IKW Studie](https://www.ikw.org/haushaltspflege/presse/neue-ikw-studie-so-putzt-deutschland-haushaltspflege-zwischen-sozialisierung-und-nachhaltigkeit))
- 44% der Paare streiten über Ordnung

---

### 6.10 Reisen (pr-reise)

| Bedürfnis | Basis | Frage | Beschreibung |
|-----------|-------|-------|--------------|
| reisefreude | 55 | "Wie wichtig ist Ihnen regelmäßiges Reisen?" | Reisefreude |
| abenteuer | 50 | "Wie wichtig ist Ihnen Abenteuer und Neues erleben?" | Abenteuer |
| erholung | 55 | "Wie wichtig ist Ihnen Erholung im Urlaub?" | Erholung |
| kulturelle_erlebnisse | 50 | "Wie wichtig sind Ihnen kulturelle Erlebnisse auf Reisen?" | Kulturelle Erlebnisse |
| staycation | 45 | "Wie wohl fühlen Sie sich mit Urlaub zu Hause (Staycation)?" | Staycation |
| fernreisen | 45 | "Wie wichtig sind Ihnen Fernreisen?" | Fernreisen |

#### Archetyp-Deltas für Reisen

| Bedürfnis | Single | Aromantisch | Duo | LAT | Solopoly | RA | Duo-Flex | Polyamor |
|-----------|--------|-------------|-----|-----|----------|-----|----------|----------|
| reisefreude | +5 | +5 | +5 | +10 | +10 | +10 | +5 | +10 |
| abenteuer | +5 | +5 | 0 | +10 | +15 | +15 | +5 | +15 |
| erholung | 0 | 0 | +10 | +5 | 0 | 0 | +5 | 0 |
| kulturelle_erlebnisse | +5 | +5 | +5 | +10 | +10 | +15 | +5 | +10 |
| staycation | 0 | +5 | +5 | -10 | -10 | -10 | 0 | -5 |
| fernreisen | +5 | +5 | 0 | +10 | +15 | +15 | +5 | +15 |

#### Orientierung-Deltas für Reisen

| Bedürfnis | Heterosexuell | Homosexuell | Bisexuell |
|-----------|---------------|-------------|-----------|
| reisefreude | 0 | +10 | +5 |
| abenteuer | 0 | +10 | +10 |
| kulturelle_erlebnisse | 0 | +10 | +5 |
| fernreisen | 0 | +10 | +5 |

**Begründung:**
- RA/Solopoly/Polyamor: Höhere Offenheit für Abenteuer und neue Erfahrungen
- LAT: Reisen als gemeinsame Quality-Time
- Duo: Mehr Erholungsfokus (Familien-/Paarstress)
- LGBTQ+: Höhere Reiseaffinität (urbane, weltoffene Lebensweise)

**Quellen:**
- 63% der Deutschen machen mind. 1 Reise/Jahr (5+ Tage) ([ADAC Tourismusstudien 2024](https://www.adac.de/verkehr/standpunkte-studien/mobilitaets-trends/tourismusstudie-reisen/))
- 2-3 Urlaube pro Jahr ist der Durchschnitt

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
