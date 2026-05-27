/**
 * RA - Archetyp-Basisprofil v5.0
 * 16 Grundbeduerfnisse nach Volker Schmidt | Werte: Durchschnitt aus Ti-Age v4.x
 */

const RAProfil = {
    id: "ra",
    name: "RA",
    beschreibung: "Keine Hierarchien keine Regeln. Jede Beziehung wird von den Beteiligten selbst definiert.",

    umfrageWerte: {
        // --- Stufe 1: Passive Basisbedurfnisse
        '#B1': 60,  // Wohlbefinden
        '#B2': 54,  // Sicherheit
        '#B3': 60,  // Leichtigkeit
        '#B4': 66,  // Orientierung
        // --- Stufe 2: Handlungs-Bedurfnisse
        '#B5': 88,  // Wirksamkeit
        '#B6': 96,  // Freiheit
        '#B7': 47,  // Intensitaet
        '#B8': 69,  // Entwicklung
        // --- Stufe 3: Soziale Bedurfnisse
        '#B9': 72,  // Gemeinschaft
        '#B10': 59,  // Anerkennung
        '#B11': 65,  // Gerechtigkeit
        '#B12': 68,  // Verbundenheit
        // --- Stufe 4: Identitaets-Bedurfnisse
        '#B13': 79,  // Selbsterkenntnis
        '#B14': 72,  // Sinn
        '#B15': 37,  // Integritaet
        '#B16': 71,  // Selbstentfaltung
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RAProfil;
}
if (typeof window !== 'undefined') {
    window.RAProfil = RAProfil;
}
