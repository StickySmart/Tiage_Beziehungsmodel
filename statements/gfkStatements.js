/**
 * GFK MICRO-STATEMENTS DATABASE
 * ==============================
 * ~90 philosophische Micro-Statements für GFK-Kombinationen
 * (Gewaltfreie Kommunikation nach Marshall Rosenberg)
 *
 * Philosophische Grundlage:
 * - Marshall Rosenberg: Die 4 Schritte der GFK
 *   1. Beobachtung (ohne Bewertung)
 *   2. Gefühl (eigene Emotionen benennen)
 *   3. Bedürfnis (dahinterliegendes Bedürfnis erkennen)
 *   4. Bitte (konkrete, erfüllbare Bitte formulieren)
 *
 * - OSHO: "Wahre Kommunikation entsteht ohne Ego"
 * - Pirsig (MOQ): GFK als dynamische Qualität in der Kommunikation
 *
 * GFK-Kompetenzstufen:
 * - hoch: Aktive Praxis, auch unter Stress anwendbar
 * - mittel: Grundkenntnisse, unter Stress Rückfall in alte Muster
 * - niedrig: Keine GFK-Erfahrung, reaktive Kommunikation
 */

const gfkStatements = {

    // ═══════════════════════════════════════════════════════════════════════
    // BEIDE HOHE GFK-KOMPETENZ (Optimale Resonanz: +10%)
    // ═══════════════════════════════════════════════════════════════════════

    "hoch_hoch": {
        pathos: [
            "Zwei Menschen, die empathisch zuhören können – Konflikte werden zu Wachstumschancen.",
            "Die Fähigkeit, hinter Vorwürfe zu hören, schafft tiefe emotionale Sicherheit.",
            "Bedürfnisse werden gehört, nicht gefordert – eine Basis für echte Intimität.",
            "Empathie als gemeinsame Sprache – selbst in stürmischen Zeiten.",
            "OSHO: Wenn das Ego schweigt, kann wahre Begegnung stattfinden.",
            "Die Kunst des Zuhörens ist die Grundlage der Liebe.",
            "Beide verstehen: Hinter jedem Vorwurf liegt ein unerfülltes Bedürfnis.",
            "Kommunikation ohne Schuldzuweisung – ein seltenes Geschenk."
        ],
        logos: [
            "Exzellente Voraussetzungen für konstruktive Kommunikation.",
            "Beide beherrschen die 4 Schritte: Beobachtung, Gefühl, Bedürfnis, Bitte.",
            "Konfliktlösung auf Augenhöhe ist selbstverständlich.",
            "Wissenschaftlich belegte höhere Beziehungszufriedenheit durch GFK.",
            "Strukturell minimales Konfliktpotenzial.",
            "Eskalationsspiralen werden frühzeitig erkannt und unterbrochen."
        ],
        pro: [
            "Konflikte werden zu Wachstumschancen",
            "Tiefe emotionale Sicherheit durch empathisches Zuhören",
            "Bedürfnisse werden klar kommuniziert",
            "Minimales Eskalationspotenzial",
            "Wissenschaftlich belegte höhere Zufriedenheit",
            "Authentische Verbindung auch in schwierigen Zeiten"
        ],
        contra: [
            "Hohe GFK-Kompetenz erfordert kontinuierliche Übung",
            "Kann überfordernd wirken auf GFK-Unerfahrene im Umfeld"
        ],
        resonanzModifier: 1.1,  // Erhöht die Gesamtresonanz
        konfliktPotenzial: "niedrig"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // EINER HOCH, EINER MITTEL (Gute Resonanz: +5%)
    // ═══════════════════════════════════════════════════════════════════════

    "hoch_mittel": {
        pathos: [
            "Der GFK-erfahrene Partner kann als Brücke dienen – Geduld ist gefragt.",
            "Unter Stress zeigt sich der Unterschied, aber Wachstum ist möglich.",
            "Die Erfahrung des einen kann den anderen inspirieren.",
            "Gemeinsames Üben kann die Verbindung vertiefen.",
            "Der Erfahrenere hält den Raum – der Lernende wächst hinein."
        ],
        logos: [
            "Solide Basis mit Entwicklungspotenzial.",
            "Der erfahrenere Partner kann unterstützen, ohne zu dominieren.",
            "In Stresssituationen ist Unterstützung durch den GFK-Erfahrenen möglich.",
            "Strukturell gute Voraussetzungen für Wachstum."
        ],
        pro: [
            "Potenzial für gemeinsames Wachstum",
            "Der Erfahrenere kann unterstützen",
            "Solide Grundlage vorhanden",
            "Entwicklung ist möglich und wahrscheinlich"
        ],
        contra: [
            "Unterschied zeigt sich unter Stress",
            "Der Erfahrenere könnte frustriert werden",
            "Geduld und Langmut sind erforderlich"
        ],
        resonanzModifier: 1.05,
        konfliktPotenzial: "mittel-niedrig"
    },

    "mittel_hoch": {
        pathos: [
            "Von der Erfahrung des Partners lernen – Wachstum durch Beziehung.",
            "Der GFK-Erfahrene bietet einen sicheren Raum für Entwicklung.",
            "Inspiration durch das Vorbild des Partners."
        ],
        logos: [
            "Asymmetrie kann zu Wachstum genutzt werden.",
            "Strukturell günstige Lernumgebung."
        ],
        pro: [
            "Lernmöglichkeit durch erfahrenen Partner",
            "Sicherer Raum für Wachstum"
        ],
        contra: [
            "Abhängigkeit vom erfahrenen Partner möglich",
            "Unter Stress Rückfall in alte Muster"
        ],
        resonanzModifier: 1.05,
        konfliktPotenzial: "mittel-niedrig"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // EINER HOCH, EINER NIEDRIG (Herausfordernde Asymmetrie: -5%)
    // ═══════════════════════════════════════════════════════════════════════

    "hoch_niedrig": {
        pathos: [
            "Eine Herausforderung: Empathie trifft auf Reaktivität.",
            "Der GFK-erfahrene Partner muss viel tragen – Gefahr der Erschöpfung.",
            "Potenzial für Transformation, wenn der Lernwille da ist.",
            "Die Geduld des Erfahrenen wird auf die Probe gestellt.",
            "Einseitiges Tragen kann langfristig ermüden.",
            "Hoffnung auf Wachstum – aber nur wenn beide es wollen."
        ],
        logos: [
            "Asymmetrie erfordert bewusste Arbeit.",
            "Ohne Bereitschaft zum Lernen kann Frustration entstehen.",
            "Klare Grenzen und Selbstfürsorge sind essenziell.",
            "Externe Unterstützung (Kurse, Therapie) kann helfen.",
            "Strukturell herausfordernd ohne aktive Entwicklung."
        ],
        pro: [
            "Transformationspotenzial bei Lernbereitschaft",
            "Der Erfahrene kann Vorbild sein",
            "Wachstum durch Herausforderung möglich"
        ],
        contra: [
            "Hohe Belastung für den GFK-Erfahrenen",
            "Einseitiges Tragen führt zu Erschöpfung",
            "Ohne Lernwille keine Verbesserung",
            "Konflikte können eskalieren",
            "Selbstfürsorge des Erfahrenen gefährdet"
        ],
        resonanzModifier: 0.95,
        konfliktPotenzial: "mittel-hoch"
    },

    "niedrig_hoch": {
        pathos: [
            "Die Chance zu lernen ist da – wird sie ergriffen?",
            "Der GFK-Erfahrene bietet einen Spiegel für eigenes Verhalten.",
            "Reaktivität trifft auf Ruhe – potentiell transformativ."
        ],
        logos: [
            "Die Lernkurve ist steil, aber möglich.",
            "Ohne eigene Motivation bleibt die Asymmetrie bestehen."
        ],
        pro: [
            "Lernchance durch erfahrenen Partner",
            "Potenzial für persönliches Wachstum"
        ],
        contra: [
            "Eigene reaktive Muster werden konfrontiert",
            "Kann als Kritik empfunden werden",
            "Ohne Eigeninitiative keine Veränderung"
        ],
        resonanzModifier: 0.95,
        konfliktPotenzial: "mittel-hoch"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // BEIDE MITTLERE GFK-KOMPETENZ (Neutrale Resonanz: 0%)
    // ═══════════════════════════════════════════════════════════════════════

    "mittel_mittel": {
        pathos: [
            "Zwei auf dem Weg – gemeinsames Wachstum ist möglich.",
            "In ruhigen Zeiten funktioniert die Kommunikation gut.",
            "Stress kann alte Muster aktivieren – Bewusstsein hilft.",
            "Gemeinsames Üben kann die Beziehung stärken.",
            "Beide kennen die Theorie – die Praxis ist der nächste Schritt.",
            "Auf gleichem Level – niemand muss warten oder einholen."
        ],
        logos: [
            "Gute Grundlage mit Entwicklungspotenzial.",
            "Beide kennen die Prinzipien, üben noch die Anwendung.",
            "Gemeinsames Üben kann die Beziehung stärken.",
            "Strukturell stabile Ausgangslage.",
            "Unter Stress können beide in alte Muster fallen."
        ],
        pro: [
            "Gemeinsames Entwicklungsniveau",
            "Gegenseitiges Verständnis für Lernprozess",
            "Potenzial für gemeinsames Wachstum",
            "Keine Asymmetrie in der Kompetenz"
        ],
        contra: [
            "Unter Stress beidseits Rückfall möglich",
            "Niemand hält den Raum bei Eskalation",
            "Externe Unterstützung kann hilfreich sein"
        ],
        resonanzModifier: 1.0,
        konfliktPotenzial: "mittel"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // EINER MITTEL, EINER NIEDRIG (Leichte Asymmetrie: -10%)
    // ═══════════════════════════════════════════════════════════════════════

    "mittel_niedrig": {
        pathos: [
            "Unterschiedliche Kommunikationsebenen können frustrieren.",
            "Der mittlere Partner fällt selbst unter Druck zurück – keine stabile Brücke.",
            "Gute Absichten treffen auf reaktive Muster.",
            "In ruhigen Zeiten geht es – unter Stress wird es schwierig."
        ],
        logos: [
            "Kommunikationsprobleme sind wahrscheinlich.",
            "Externe Unterstützung (Paartherapie, Kurse) kann helfen.",
            "Der mittlere Partner ist selbst noch nicht stabil genug.",
            "Strukturell erhöhtes Konfliktpotenzial."
        ],
        pro: [
            "Einer hat zumindest Grundkenntnisse",
            "Potenzial für Verbesserung vorhanden"
        ],
        contra: [
            "Beide können unter Stress eskalieren",
            "Keine stabile Brücke vorhanden",
            "Externe Unterstützung empfohlen",
            "Missverständnisse wahrscheinlich"
        ],
        resonanzModifier: 0.9,
        konfliktPotenzial: "hoch"
    },

    "niedrig_mittel": {
        pathos: [
            "Das mittlere Level des Partners kann helfen – aber nicht immer.",
            "Unterschiedliche Kommunikationsstile prallen aufeinander.",
            "In guten Zeiten funktioniert es, in schlechten nicht."
        ],
        logos: [
            "Asymmetrie kann zu Frustration führen.",
            "Der mittlere Partner ist nicht stabil genug, um zu kompensieren."
        ],
        pro: [
            "Etwas Kompetenz vorhanden",
            "Entwicklung möglich"
        ],
        contra: [
            "Unter Stress beidseitige Eskalation wahrscheinlich",
            "Grundlegende Kommunikationsprobleme möglich"
        ],
        resonanzModifier: 0.9,
        konfliktPotenzial: "hoch"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // BEIDE NIEDRIGE GFK-KOMPETENZ (Starke Herausforderung: -20%)
    // ═══════════════════════════════════════════════════════════════════════

    "niedrig_niedrig": {
        pathos: [
            "Kommunikation geprägt von Vorwürfen und Missverständnissen.",
            "Eskalation ist wahrscheinlich – ohne Werkzeuge fehlt der Ausweg.",
            "Verletzungen entstehen oft unbeabsichtigt, heilen langsam.",
            "Zwei reaktive Systeme treffen aufeinander – Funkenflug.",
            "Ohne Bewusstsein für Bedürfnisse bleibt es bei Vorwürfen.",
            "Der Kreislauf von Angriff und Verteidigung dreht sich.",
            "Liebe ist da, aber die Sprache fehlt."
        ],
        logos: [
            "Hohe Wahrscheinlichkeit für destruktive Konfliktmuster.",
            "Beide brauchen Unterstützung – GFK-Kurse dringend empfohlen.",
            "Ohne Intervention kann die Beziehung leiden.",
            "Strukturell hohes Risiko für chronische Konflikte.",
            "Wissenschaftlich belegte geringere Beziehungszufriedenheit.",
            "Externe Unterstützung ist keine Option, sondern Notwendigkeit."
        ],
        pro: [
            "Gleiches Level – kein Gefälle",
            "Gemeinsamer Ausgangspunkt für Wachstum",
            "Wenn beide lernen wollen, können sie gemeinsam wachsen"
        ],
        contra: [
            "Hohe Wahrscheinlichkeit für destruktive Muster",
            "Eskalationsspiralen ohne natürlichen Ausgang",
            "Verletzungen entstehen unbeabsichtigt",
            "GFK-Kurse oder Paartherapie dringend empfohlen",
            "Ohne Intervention chronische Konflikte wahrscheinlich",
            "Beide brauchen aktive Entwicklung"
        ],
        resonanzModifier: 0.8,
        konfliktPotenzial: "sehr hoch"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FALLBACK für unvollständige Auswahl
    // ═══════════════════════════════════════════════════════════════════════

    "default": {
        pathos: [
            "Die GFK-Kompetenz ist noch nicht bekannt.",
            "Kommunikationsstil bleibt unbewertet."
        ],
        logos: [
            "Ohne GFK-Information kann der Kommunikationsfaktor nicht bewertet werden.",
            "Standardwert wird verwendet."
        ],
        pro: [
            "Neutrale Ausgangssituation"
        ],
        contra: [
            "Wichtiger Beziehungsfaktor nicht bewertet"
        ],
        resonanzModifier: 1.0,
        konfliktPotenzial: "unbekannt"
    }
};

// Hilfsfunktion: Hole GFK-Statements basierend auf beiden Kompetenzen
function getGfkStatements(gfk1, gfk2) {
    if (!gfk1 || !gfk2) return gfkStatements.default;

    // Normalisiere auf Key-Format (hoch, mittel, niedrig)
    const normalize = (g) => g?.toLowerCase() || null;
    const g1 = normalize(gfk1);
    const g2 = normalize(gfk2);

    if (!g1 || !g2) return gfkStatements.default;

    // Sortiere für konsistente Keys (hoch vor mittel vor niedrig)
    const order = { 'hoch': 0, 'mittel': 1, 'niedrig': 2 };
    const sorted = [g1, g2].sort((a, b) => (order[a] || 99) - (order[b] || 99));
    const key = `${sorted[0]}_${sorted[1]}`;

    return gfkStatements[key] || gfkStatements.default;
}

// Hilfsfunktion: Berechne Resonanz-Modifikator aus GFK-Kombination
function getGfkResonanzModifier(gfk1, gfk2) {
    const statements = getGfkStatements(gfk1, gfk2);
    return statements.resonanzModifier || 1.0;
}

// Hilfsfunktion: Hole Konfliktpotenzial-Level
function getGfkKonfliktPotenzial(gfk1, gfk2) {
    const statements = getGfkStatements(gfk1, gfk2);
    return statements.konfliktPotenzial || "unbekannt";
}

// Export für Verwendung in anderen Modulen
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { gfkStatements, getGfkStatements, getGfkResonanzModifier, getGfkKonfliktPotenzial };
}
