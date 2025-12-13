# Claude Prompt: Neues Bedürfnis hinzufügen

> Dieser Prompt ermöglicht es Claude, ein neues Bedürfnis vollständig zu recherchieren und alle Code-Änderungen zu generieren.

---

## Der Prompt

Kopiere den folgenden Prompt und ersetze `[BEDÜRFNIS]` mit deinem gewünschten Bedürfnis:

---

```markdown
# Aufgabe: Neues Bedürfnis für Ti-Age System erstellen

## Das neue Bedürfnis
**Name:** [BEDÜRFNIS]
**Beispiel:** "Interesse an Metaphysik" oder "Bedürfnis nach Stille" oder "Wunsch nach Abenteuer"

---

## Phase 1: Recherche

Bitte recherchiere im Internet:

### 1.1 Definition
- Was bedeutet dieses Bedürfnis genau?
- Wie wird es in der Psychologie definiert?
- Welche verwandten Konzepte gibt es?

### 1.2 Philosophische Perspektiven

Recherchiere wie diese 4 Perspektiven das Bedürfnis sehen würden:

| Perspektive | Recherche-Fragen |
|-------------|------------------|
| **Statistik (#P1)** | Gibt es empirische Forschung? Wie verteilt sich das Bedürfnis in der Bevölkerung (Gaußkurve)? |
| **Osho (#P2)** | Wie würde Osho dieses Bedürfnis aus tantrischer/spiritueller Sicht betrachten? Fördert es Freiheit oder Anhaftung? |
| **Pirsig (#P3)** | Ist es statische oder dynamische Qualität? Wie passt es zur Qualitäts-Philosophie? |
| **SexPositiv (#P4)** | Hat das Bedürfnis eine Komponente von Consent, Autonomie, BDSM/Kink oder sexueller Freiheit? |

### 1.3 Beziehungsrelevanz
- Wie beeinflusst dieses Bedürfnis romantische Beziehungen?
- Kann es zu Konflikten führen wenn Partner unterschiedlich ausgeprägt sind?
- Ist es eher komplementär oder sollten Partner ähnlich sein?

---

## Phase 2: Einordnung

Basierend auf der Recherche, bestimme:

### 2.1 Kategorie (wähle eine)

**GFK Kern-Kategorien (#K1-#K10):**

| ID | Kategorie | Wählen wenn... |
|----|-----------|----------------|
| #K1 | Existenz | Grundlegende physische Bedürfnisse |
| #K2 | Sicherheit | Emotionale und psychische Sicherheit |
| #K3 | Zuneigung | Liebe, Nähe, emotionale Verbindung |
| #K4 | Verständnis | Gesehen und verstanden werden |
| #K5 | Freiheit | Autonomie, Selbstbestimmung |
| #K6 | Teilnahme | Gemeinschaft, Zugehörigkeit |
| #K7 | Muße | Erholung, Freude, Genuss |
| #K8 | Identität | Selbstverwirklichung, Sinn |
| #K9 | Erschaffen | Kreativität, Lernen |
| #K10 | Verbundenheit | Tiefe existenzielle Verbindung |

**Dynamik-Kategorie (#K11):**

| ID | Kategorie | Wählen wenn... |
|----|-----------|----------------|
| #K11 | Dynamik & Austausch | Machtdynamik, BDSM/Kink |

**Lebensbereiche (#K12-#K18):**

| ID | Kategorie | Wählen wenn... |
|----|-----------|----------------|
| #K12 | Lebensplanung | Kinder, Ehe, Wohnen, Familie |
| #K13 | Finanzen & Karriere | Geld, Beruf, Work-Life-Balance |
| #K14 | Kommunikationsstil | Gespräche, Emotionen, Konflikte |
| #K15 | Soziales Leben | Introversion/Extroversion, Freunde |
| #K16 | Intimität & Romantik | Körperliche Nähe, Romantik, Sexualität |
| #K17 | Werte & Haltungen | Religion, Tradition, Umwelt |
| #K18 | Praktisches Leben | Ordnung, Reisen, Alltag |

### 2.2 Perspektive (wähle eine)

| ID | Perspektive | Wählen wenn... |
|----|-------------|----------------|
| #P1 | Statistik | Empirische Forschung, Gaußsche Übereinstimmung |
| #P2 | Osho | Tantra, Polarität, Natürlichkeit vs. Konditionierung |
| #P3 | Pirsig | Static vs. Dynamic Quality, Qualität als Fundament |
| #P4 | SexPositiv | Sex-Positive Movement, Consent, Autonomie, BDSM/Kink |

### 2.3 Dimension (wähle eine)

| Dimension | R-Faktor | Wählen wenn... |
|-----------|----------|----------------|
| ORIENTIERUNG_NEEDS | R1 | Sexualität, Anziehung, Intimität |
| ARCHETYP_NEEDS | R2 | Beziehungsform, Lebensphilosophie |
| DOMINANZ_NEEDS | R3 | Macht, Führung, Hingabe |
| GESCHLECHT_NEEDS | R4 | Identität, Gender, Ausdruck |

---

## Phase 3: Werte bestimmen

Recherchiere für jeden Archetyp einen begründeten Wert (0-100):

| Archetyp | Typische Ausprägung | Begründung |
|----------|---------------------|------------|
| **Single** | ? | Warum dieser Wert? |
| **Duo** | ? | Warum dieser Wert? |
| **Duo-Flex** | ? | Warum dieser Wert? |
| **Solopoly** | ? | Warum dieser Wert? |
| **Polyamor** | ? | Warum dieser Wert? |
| **RA** | ? | Warum dieser Wert? |
| **LAT** | ? | Warum dieser Wert? |
| **Aromantisch** | ? | Warum dieser Wert? |

**Werte-Skala:**
- 0-20: Aktiv vermieden / irrelevant
- 21-40: Gering ausgeprägt
- 41-60: Moderat / neutral
- 61-80: Stark ausgeprägt
- 81-100: Zentral / sehr wichtig

---

## Phase 4: Modifier bestimmen

Wie verändert sich das Bedürfnis durch:

### Dominanz-Modifier
| Typ | Delta | Begründung |
|-----|-------|------------|
| Dominant | +/- ? | |
| Submissiv | +/- ? | |
| Switch | +/- ? | |
| Ausgeglichen | +/- ? | |

### Orientierung-Modifier
| Typ | Delta | Begründung |
|-----|-------|------------|
| Hetero | +/- ? | |
| Homo | +/- ? | |
| Bi/Pan | +/- ? | |

### Geschlecht-Modifier (Primary/Secondary)
| Typ | Delta | Begründung |
|-----|-------|------------|
| cis_mann | +/- ? | |
| cis_frau | +/- ? | |
| trans_mann | +/- ? | |
| trans_frau | +/- ? | |
| nonbinaer | +/- ? | |
| genderfluid | +/- ? | |
| agender | +/- ? | |
| intersex | +/- ? | |
| divers | +/- ? | |

### Geschlechtsidentität-Modifier
| Typ | Delta | Begründung |
|-----|-------|------------|
| cis | +/- ? | |
| trans | +/- ? | |
| nonbinaer | +/- ? | |
| fluid | +/- ? | |
| suchend | +/- ? | |

---

## Phase 5: Texte erstellen

### 5.1 Label (kurz)
Deutsch: "..."
English: "..."

### 5.2 Beschreibung (1-2 Sätze)
Deutsch: "..."
English: "..."

### 5.3 Konflikt-Beschreibung
Was passiert wenn Partner sehr unterschiedliche Werte haben?

---

## Phase 6: Code generieren

Generiere den vollständigen Code für alle 9 Dateien:

1. `profiles/definitions/beduerfnis-ids.js`
2. `profiles/definitions/gfk-beduerfnisse.js`
3. `js/synthesis/constants.js` (NEEDS Array)
4. `js/synthesis/constants.js` (ARCHETYP_KOHAERENZ)
5. `profiles/beduerfnis-modifikatoren.js`
6. `profiles/archetypen/single.js`
7. `profiles/archetypen/duo.js`
8. `profiles/archetypen/duo-flex.js`
9. `profiles/archetypen/solopoly.js`
10. `profiles/archetypen/polyamor.js`
11. `profiles/archetypen/ra.js`
12. `profiles/archetypen/lat.js`
13. `profiles/archetypen/aromantisch.js`
14. `js/locales/de.js`
15. `js/locales/en.js`
16. `js/components/PerspektivenModal.js`

Zeige für jede Datei:
- Den genauen Pfad
- Die Zeile/Stelle wo eingefügt werden soll
- Den kompletten Code-Snippet

---

## Ausgabe-Format

Bitte strukturiere deine Antwort so:

### Recherche-Ergebnis
[Zusammenfassung der Recherche]

### Einordnung
- ID: #B???
- Key: `bedürfnis_key`
- Kategorie: #K?? (Name)
- Perspektive: #P? (Name)
- Dimension: ???_NEEDS

### Archetyp-Werte
[Tabelle mit allen 8 Werten + Begründungen]

### Code-Änderungen
[Alle Code-Snippets für alle Dateien]

### Validierung
[Wie kann man testen ob alles funktioniert?]
```

---

## Beispiel-Verwendung

### Input an Claude:

```
# Aufgabe: Neues Bedürfnis für Ti-Age System erstellen

## Das neue Bedürfnis
**Name:** Interesse an Metaphysik

[Rest des Prompts...]
```

### Erwarteter Output:

Claude wird:
1. Im Internet nach Metaphysik recherchieren
2. Statistik, Osho, Pirsig, SexPositiv Perspektiven analysieren
3. Passende Kategorie (#K1-#K18), Perspektive (#P1-#P4), Dimension (R1-R4) vorschlagen
4. Werte für alle 8 Archetypen recherchieren und begründen
5. Alle Code-Snippets generieren

---

## Tipps

### Für bessere Recherche-Ergebnisse:

1. **Spezifisch sein**: "Bedürfnis nach meditativer Stille" statt nur "Stille"

2. **Kontext geben**: "Im Kontext von romantischen Beziehungen"

3. **Beispiele nennen**: "Ähnlich wie das existierende Bedürfnis 'spiritualitaet'"

### Bei unklaren Ergebnissen:

Frage Claude nach:
- "Kannst du alternative Kategorien vorschlagen?"
- "Wie würde sich der Wert für Duo ändern wenn...?"
- "Gibt es Konflikte mit bestehenden Bedürfnissen?"

---

## Workflow-Diagramm

```
┌──────────────────┐
│ User gibt Name   │
│ des Bedürfnisses │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Claude           │
│ recherchiert     │◄─── Web Search
│ (Phase 1)        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Claude ordnet    │
│ ein (Phase 2-4)  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Claude generiert │
│ Texte (Phase 5)  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Claude generiert │
│ Code (Phase 6)   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ User reviewed    │
│ und passt an     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ User fügt Code   │
│ in Dateien ein   │
└──────────────────┘
```

---

*Dokumentation erstellt: 2025-12-13*
*Für Ti-Age Beziehungsmodell*
