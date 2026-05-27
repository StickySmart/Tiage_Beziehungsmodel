/**
 * LAT - Archetyp-Basisprofil v5.0
 * 16 Grundbeduerfnisse nach Volker Schmidt | Werte: Durchschnitt aus Ti-Age v4.x
 */

const LATProfil = {
    id: "lat",
    name: "LAT",
    beschreibung: "Liebe mit Abstand. Feste Partnerschaft getrennte Wohnungen.",

    umfrageWerte: {
        // --- Stufe 1: Passive Basisbedurfnisse
        '#B1': 64,  // Wohlbefinden
        '#B2': 68,  // Sicherheit
        '#B3': 58,  // Leichtigkeit
        '#B4': 67,  // Orientierung
        // --- Stufe 2: Handlungs-Bedurfnisse
        '#B5': 75,  // Wirksamkeit
        '#B6': 84,  // Freiheit
        '#B7': 54,  // Intensitaet
        '#B8': 65,  // Entwicklung
        // --- Stufe 3: Soziale Bedurfnisse
        '#B9': 70,  // Gemeinschaft
        '#B10': 63,  // Anerkennung
        '#B11': 59,  // Gerechtigkeit
        '#B12': 74,  // Verbundenheit
        // --- Stufe 4: Identitaets-Bedurfnisse
        '#B13': 78,  // Selbsterkenntnis
        '#B14': 63,  // Sinn
        '#B15': 50,  // Integritaet
        '#B16': 78,  // Selbstentfaltung
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LATProfil;
}
if (typeof window !== 'undefined') {
    window.LATProfil = LATProfil;
}
