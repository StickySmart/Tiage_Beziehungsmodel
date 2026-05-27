/**
 * DUO-FLEX - Archetyp-Basisprofil v5.0
 * 16 Grundbeduerfnisse nach Volker Kiel | Werte: Durchschnitt aus Ti-Age v4.x
 */

const DuoFlexProfil = {
    id: "duo-flex",
    name: "Duo-Flex",
    beschreibung: "Sichere Basis mit Raum fuer Individualitaet. Balance zwischen Wir und Ich.",

    umfrageWerte: {
        // --- Stufe 1: Passive Basisbedurfnisse
        '#B1': 63,  // Wohlbefinden
        '#B2': 73,  // Sicherheit
        '#B3': 58,  // Leichtigkeit
        '#B4': 68,  // Orientierung
        // --- Stufe 2: Handlungs-Bedurfnisse
        '#B5': 72,  // Wirksamkeit
        '#B6': 69,  // Freiheit
        '#B7': 59,  // Intensitaet
        '#B8': 77,  // Entwicklung
        // --- Stufe 3: Soziale Bedurfnisse
        '#B9': 76,  // Gemeinschaft
        '#B10': 79,  // Anerkennung
        '#B11': 63,  // Gerechtigkeit
        '#B12': 79,  // Verbundenheit
        // --- Stufe 4: Identitaets-Bedurfnisse
        '#B13': 77,  // Selbsterkenntnis
        '#B14': 68,  // Sinn
        '#B15': 70,  // Integritaet
        '#B16': 81,  // Selbstentfaltung
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DuoFlexProfil;
}
if (typeof window !== 'undefined') {
    window.DuoFlexProfil = DuoFlexProfil;
}
