/**
 * SINGLE - Archetyp-Basisprofil v5.0
 * 16 Grundbeduerfnisse nach Volker Schmidt | Werte: Durchschnitt aus Ti-Age v4.x
 */

const SingleProfil = {
    id: "single",
    name: "Single",
    beschreibung: "Maximale Autonomie und Selbstverwirklichung. Freiheit steht ueber Bindung.",

    umfrageWerte: {
        // --- Stufe 1: Passive Basisbedurfnisse
        '#B1': 58,  // Wohlbefinden
        '#B2': 45,  // Sicherheit
        '#B3': 56,  // Leichtigkeit
        '#B4': 64,  // Orientierung
        // --- Stufe 2: Handlungs-Bedurfnisse
        '#B5': 80,  // Wirksamkeit
        '#B6': 91,  // Freiheit
        '#B7': 40,  // Intensitaet
        '#B8': 50,  // Entwicklung
        // --- Stufe 3: Soziale Bedurfnisse
        '#B9': 59,  // Gemeinschaft
        '#B10': 39,  // Anerkennung
        '#B11': 54,  // Gerechtigkeit
        '#B12': 52,  // Verbundenheit
        // --- Stufe 4: Identitaets-Bedurfnisse
        '#B13': 77,  // Selbsterkenntnis
        '#B14': 58,  // Sinn
        '#B15': 28,  // Integritaet
        '#B16': 55,  // Selbstentfaltung
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SingleProfil;
}
if (typeof window !== 'undefined') {
    window.SingleProfil = SingleProfil;
}
