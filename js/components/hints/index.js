/**
 * PHILOSOPHY HINTS - MOMENT KOMPONENTEN
 *
 * 8 spezifische Moment-Komponenten für den Tiage Profil-Flow.
 * Basierend auf Oshos vier Kernkonzepten:
 * - Konditionierung: Die geladenen Werte SIND Konditionierung
 * - Bewusstsein: Reflexion - was habe ich gewählt vs. was wurde mir beigebracht?
 * - Flow: Hinweise begleiten, unterbrechen nicht
 * - Meditation: Verlangsamung durch Fragen
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const PhilosophyHints = (function() {
    'use strict';

    // ========================================
    // HINT TEXTE
    // ========================================

    const HINTS = {
        /**
         * Moment 0a: Landing Page (neuer Nutzer)
         * Trigger: Nutzer öffnet App zum ersten Mal / Landing Page
         * Konzept: Neugier wecken + Vertrauen aufbauen + differenzieren von Dating-Apps
         * Ton: Einladend, differenzierend
         */
        moment0a: {
            id: 'moment-0a-landing',
            visible: 'Das hier ist kein Matching. Das hier ist ein Gespräch mit dir selbst – über das, was du wirklich willst.',
            linkText: 'Was erwartet mich?',
            expandedContent: `Tiage berechnet keine Traumpartner. Es zeigt dir, welche Muster du in Beziehungen lebst – und wo du dich von deinen Labels unterscheidest.

Du wirst Entscheidungen treffen: Archetyp, Orientierung, Dominanz, Geschlecht. Das klingt nach Schubladen – ist es aber nicht. Jede Auswahl lädt statistische Erwartungen. Dann zeigst du, wo du anders bist.

Definiere deine eigene Überzeugung der Archetypen über die jeweilige Einstellung (⚙️ Zahnrad-Icon). Der Algorithmus kann dich nur inspirieren – sich an aktuellen Methoden zu orientieren, dein Selbstbild abzugleichen, und in Bezug zu unserer Prägung dich hinauszuentwickeln in die Freiheit.

Nimm dir Zeit. Es gibt keine falschen Antworten.`,
            variant: 'default'
        },

        /**
         * Moment 0b: App-Start (wiederkehrender Nutzer)
         * Trigger: Nutzer öffnet App, hat bereits Profil
         * Konzept: Wieder ankommen, sanft erinnern, Veränderung einladen
         * Ton: Warm, offen
         */
        moment0b: {
            id: 'moment-0b-returning',
            visible: 'Du bist zurück. Dein Profil wartet – so wie du es verlassen hast.',
            linkText: 'Was hat sich geändert?',
            expandedContent: `Deine gelockten Werte sind noch da. Sie bleiben, egal welche Labels du ausprobierst.

Falls du dich verändert hast seit dem letzten Mal: Das Modell auch. Schau rein. Vielleicht siehst du etwas Neues.`,
            variant: 'default'
        },

        /**
         * Moment 1: Start
         * Trigger: Profil-Erstellung wird geöffnet
         * Konzept: Konditionierung ankündigen
         * Ton: Einladend
         */
        moment1: {
            id: 'moment-1-start',
            visible: 'Du wirst gleich Labels wählen. Sie beschreiben dich nicht – sie sind der Anfang eines Gesprächs mit dir selbst.',
            linkText: 'Mehr dazu',
            expandedContent: `Archetyp, Orientierung, Dominanz, Geschlecht – das sind keine Wahrheiten über dich. Es sind Muster, die du irgendwann übernommen hast. Manche passen. Manche nicht mehr.

Diese App misst nicht, wer du bist. Sie macht sichtbar, welche Muster du lebst – und wo du vielleicht anders fühlst als dein Label vermuten lässt.`,
            variant: 'default'
        },

        /**
         * Moment 2: Nach AGOD-Auswahl
         * Trigger: Alle 4 AGOD-Kategorien gewählt
         * Konzept: Bewusstheit für die Wahl
         * Ton: Sanft konfrontierend
         */
        moment2: {
            id: 'moment-2-after-agod',
            visible: 'Vier Entscheidungen. Keine davon ist endgültig.',
            linkText: 'Warum?',
            expandedContent: `Was du gerade gewählt hast, fühlt sich vielleicht selbstverständlich an. Aber frag dich: Hast du das gewählt – oder wurde es dir beigebracht?

Du kannst jederzeit zurück. Das Modell bewertet nicht. Es zeigt nur, was sich ändert, wenn du andere Muster ausprobierst.`,
            variant: 'default'
        },

        /**
         * Moment 3: Bedürfnisse laden
         * Trigger: Bedürfnis-Werte werden geladen
         * Konzept: Der Spiegel (WICHTIGSTER MOMENT)
         * Ton: Direkt
         */
        moment3: {
            id: 'moment-3-needs-loaded',
            visible: 'Das hier bist nicht du. Das hier ist, was dein Label erwarten lässt.',
            linkText: 'Was bedeutet das?',
            expandedContent: `Jede Auswahl die du getroffen hast – Archetyp, Orientierung, Dominanz, Geschlecht – trägt statistische Muster mit sich. Erwartungen. Konditionierung.

Die Werte die du jetzt siehst, sind nicht DEINE Wahrheit. Sie sind der Durchschnitt von Menschen mit ähnlichen Labels.

Jetzt beginnt die eigentliche Arbeit: Wo stimmst du zu? Wo nicht? Was du änderst und lockst, wird zu deinem Profil. Der Rest bleibt Statistik.`,
            variant: 'highlight'
        },

        /**
         * Moment 4: Erster Lock
         * Trigger: Erster Lock wird gesetzt (nur einmal zeigen!)
         * Konzept: Eigene Wahrheit
         * Ton: Bestätigend
         */
        moment4: {
            id: 'moment-4-first-lock',
            visible: 'Das ist jetzt deins. Kein Label kann es dir nehmen.',
            linkText: 'Was passiert hier?',
            expandedContent: `Wenn du einen Wert lockst, sagst du: Das ist meine Wahrheit, unabhängig davon welches Label ich trage.

Gelockte Werte bleiben, auch wenn du später Archetyp oder Orientierung änderst. Sie sind der Kern – das, was du weißt, nicht das, was dir gesagt wurde.`,
            variant: 'default'
        },

        /**
         * Moment 5: Konflikt bei AGOD-Änderung
         * Trigger: AGOD-Änderung UND gelockte Werte weichen von neuen Erwartungswerten ab
         * Konzept: Konflikt als Erkenntnis
         * Ton: Ermutigend
         */
        moment5: {
            id: 'moment-5-conflict',
            visible: 'Hier weichst du von deinem neuen Label ab. Das ist kein Fehler – das bist du.',
            linkText: 'Zeig mir mehr',
            expandedContent: `Die Werte die du gelockt hast, passen nicht zur statistischen Erwartung deiner neuen Auswahl. Das bedeutet nicht, dass etwas falsch ist.

Es bedeutet: Du bist kein Durchschnitt. Deine Erfahrung hat dich geformt – nicht nur dein Label. Genau das macht dein Profil einzigartig.`,
            variant: 'default'
        },

        /**
         * Moment 6: Partner-Vergleich / Ergebnis
         * Trigger: Ergebnis-Screen
         * Konzept: Resonanz statt Urteil
         * Ton: Öffnend
         */
        moment6: {
            id: 'moment-6-result',
            visible: 'Das ist keine Bewertung. Das ist ein Spiegel für euch beide.',
            linkText: 'Was zeigt der Score?',
            expandedContent: `Der Qualitätsindex misst nicht, ob eine Beziehung "funktioniert". Er zeigt, wo Resonanz ist und wo Spannung.

Spannung ist nicht schlecht. Resonanz ist nicht automatisch gut. Beides braucht Bewusstsein.

Schau nicht auf die Zahl. Schau auf die Bedürfnisse. Wo seid ihr nah? Wo weit? Das ist das Gespräch, das jetzt beginnen kann.`,
            variant: 'default'
        }
    };

    // ========================================
    // HELPER: CHECK IF MOMENTS ENABLED
    // ========================================

    /**
     * Prüft ob Momente global aktiviert sind
     * @returns {boolean}
     */
    function checkMomentsEnabled() {
        // Prüfe ob HintState existiert und Momente aktiviert sind
        if (typeof HintState !== 'undefined' && typeof HintState.areMomentsEnabled === 'function') {
            return HintState.areMomentsEnabled();
        }
        // Fallback: direkt aus localStorage lesen
        try {
            const stored = localStorage.getItem('tiage_moments_enabled');
            return stored === null ? true : stored === 'true';
        } catch (e) {
            return true;
        }
    }

    /**
     * Erstellt ein leeres Placeholder-Element wenn Momente deaktiviert sind
     * @returns {HTMLElement}
     */
    function createDisabledPlaceholder() {
        const placeholder = document.createElement('div');
        placeholder.className = 'philosophy-hint-disabled';
        placeholder.style.display = 'none';
        return placeholder;
    }

    // ========================================
    // FACTORY FUNCTIONS
    // ========================================

    /**
     * Erstellt Moment 0a: Landing Page Hint (neue Nutzer)
     * Trigger: isNewUser || isLandingPage
     * @param {Object} [options] - Zusätzliche Optionen
     * @returns {HTMLElement} Die Hint-Komponente
     */
    function createMoment0aLanding(options = {}) {
        return PhilosophyHint.create({
            ...HINTS.moment0a,
            ...options
        });
    }

    /**
     * Erstellt Moment 0b: Returning User Hint (wiederkehrende Nutzer)
     * Trigger: hasExistingProfile && isAppStart
     * @param {Object} [options] - Zusätzliche Optionen
     * @returns {HTMLElement} Die Hint-Komponente
     */
    function createMoment0bReturning(options = {}) {
        return PhilosophyHint.create({
            ...HINTS.moment0b,
            ...options
        });
    }

    /**
     * Erstellt Moment 1: Start Hint
     * @param {Object} [options] - Zusätzliche Optionen
     * @returns {HTMLElement} Die Hint-Komponente oder ein leeres Element
     */
    function createMoment1Start(options = {}) {
        if (!checkMomentsEnabled()) {
            return createDisabledPlaceholder();
        }
        return PhilosophyHint.create({
            ...HINTS.moment1,
            ...options
        });
    }

    /**
     * Erstellt Moment 2: Nach AGOD Hint
     * @param {Object} [options] - Zusätzliche Optionen
     * @returns {HTMLElement} Die Hint-Komponente oder ein leeres Element
     */
    function createMoment2AfterAGOD(options = {}) {
        if (!checkMomentsEnabled()) {
            return createDisabledPlaceholder();
        }
        return PhilosophyHint.create({
            ...HINTS.moment2,
            ...options
        });
    }

    /**
     * Erstellt Moment 3: Needs Loaded Hint (WICHTIGSTER)
     * @param {Object} [options] - Zusätzliche Optionen
     * @returns {HTMLElement} Die Hint-Komponente oder ein leeres Element
     */
    function createMoment3NeedsLoaded(options = {}) {
        if (!checkMomentsEnabled()) {
            return createDisabledPlaceholder();
        }
        return PhilosophyHint.create({
            ...HINTS.moment3,
            ...options
        });
    }

    /**
     * Erstellt Moment 4: First Lock Hint
     * Hinweis: Sollte nur einmal pro Session gezeigt werden!
     * @param {Object} [options] - Zusätzliche Optionen
     * @returns {HTMLElement} Die Hint-Komponente oder ein leeres Element
     */
    function createMoment4FirstLock(options = {}) {
        if (!checkMomentsEnabled()) {
            return createDisabledPlaceholder();
        }
        return PhilosophyHint.create({
            ...HINTS.moment4,
            ...options
        });
    }

    /**
     * Erstellt Moment 5: Conflict Hint
     * @param {Object} [options] - Zusätzliche Optionen
     * @returns {HTMLElement} Die Hint-Komponente oder ein leeres Element
     */
    function createMoment5Conflict(options = {}) {
        if (!checkMomentsEnabled()) {
            return createDisabledPlaceholder();
        }
        return PhilosophyHint.create({
            ...HINTS.moment5,
            ...options
        });
    }

    /**
     * Erstellt Moment 6: Result Hint
     * @param {Object} [options] - Zusätzliche Optionen
     * @returns {HTMLElement} Die Hint-Komponente oder ein leeres Element
     */
    function createMoment6Result(options = {}) {
        if (!checkMomentsEnabled()) {
            return createDisabledPlaceholder();
        }
        return PhilosophyHint.create({
            ...HINTS.moment6,
            ...options
        });
    }

    // ========================================
    // HELPER FUNCTIONS
    // ========================================

    /**
     * Gibt alle Hint-Definitionen zurück
     * @returns {Object} Alle Hint-Definitionen
     */
    function getHintDefinitions() {
        return { ...HINTS };
    }

    /**
     * Gibt eine spezifische Hint-Definition zurück
     * @param {string} momentKey - z.B. 'moment1', 'moment3'
     * @returns {Object|null} Die Hint-Definition oder null
     */
    function getHintDefinition(momentKey) {
        return HINTS[momentKey] || null;
    }

    // ========================================
    // PUBLIC API
    // ========================================

    return {
        // Factory Functions
        createMoment0aLanding,
        createMoment0bReturning,
        createMoment1Start,
        createMoment2AfterAGOD,
        createMoment3NeedsLoaded,
        createMoment4FirstLock,
        createMoment5Conflict,
        createMoment6Result,

        // Aliases (kürzere Namen)
        HintMoment0aLanding: createMoment0aLanding,
        HintMoment0bReturning: createMoment0bReturning,
        HintMoment1Start: createMoment1Start,
        HintMoment2AfterAGOD: createMoment2AfterAGOD,
        HintMoment3NeedsLoaded: createMoment3NeedsLoaded,
        HintMoment4FirstLock: createMoment4FirstLock,
        HintMoment5Conflict: createMoment5Conflict,
        HintMoment6Result: createMoment6Result,

        // Helpers
        getHintDefinitions,
        getHintDefinition,

        // Global Toggle Helper
        areMomentsEnabled: checkMomentsEnabled,

        // Raw definitions (für Tests/Anpassungen)
        HINTS
    };

})();

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhilosophyHints;
}
