/**
 * SOLOPOLY - Archetyp-Basisprofil v5.0
 * 16 Grundbeduerfnisse nach Volker Schmidt | Werte: Durchschnitt aus Ti-Age v4.x
 */

const SolopolyProfil = {
    id: "solopoly",
    name: "Solopoly",
    beschreibung: "Autonomie als Fundament. Liebesfaehig ohne Abhaengigkeit.",

    umfrageWerte: {
        // --- Stufe 1: Passive Basisbedurfnisse
        '#B1': 65,  // Wohlbefinden
        '#B2': 58,  // Sicherheit
        '#B3': 61,  // Leichtigkeit
        '#B4': 67,  // Orientierung
        // --- Stufe 2: Handlungs-Bedurfnisse
        '#B5': 82,  // Wirksamkeit
        '#B6': 93,  // Freiheit
        '#B7': 51,  // Intensitaet
        '#B8': 64,  // Entwicklung
        // --- Stufe 3: Soziale Bedurfnisse
        '#B9': 74,  // Gemeinschaft
        '#B10': 62,  // Anerkennung
        '#B11': 65,  // Gerechtigkeit
        '#B12': 65,  // Verbundenheit
        // --- Stufe 4: Identitaets-Bedurfnisse
        '#B13': 80,  // Selbsterkenntnis
        '#B14': 70,  // Sinn
        '#B15': 43,  // Integritaet
        '#B16': 68,  // Selbstentfaltung
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SolopolyProfil;
}
if (typeof window !== 'undefined') {
    window.SolopolyProfil = SolopolyProfil;
}
