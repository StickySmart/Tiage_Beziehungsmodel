/**
 * AROMANTISCH - Archetyp-Basisprofil v5.0
 * 16 Grundbeduerfnisse nach Volker Schmidt | Werte: Durchschnitt aus Ti-Age v4.x
 */

const AromantischProfil = {
    id: "aromantisch",
    name: "Aromantisch",
    beschreibung: "Erfuelltes Leben jenseits romantischer Liebe. Tiefe Freundschaften.",

    umfrageWerte: {
        // --- Stufe 1: Passive Basisbedurfnisse
        '#B1': 57,  // Wohlbefinden
        '#B2': 63,  // Sicherheit
        '#B3': 54,  // Leichtigkeit
        '#B4': 64,  // Orientierung
        // --- Stufe 2: Handlungs-Bedurfnisse
        '#B5': 80,  // Wirksamkeit
        '#B6': 86,  // Freiheit
        '#B7': 42,  // Intensitaet
        '#B8': 49,  // Entwicklung
        // --- Stufe 3: Soziale Bedurfnisse
        '#B9': 60,  // Gemeinschaft
        '#B10': 30,  // Anerkennung
        '#B11': 56,  // Gerechtigkeit
        '#B12': 62,  // Verbundenheit
        // --- Stufe 4: Identitaets-Bedurfnisse
        '#B13': 81,  // Selbsterkenntnis
        '#B14': 57,  // Sinn
        '#B15': 26,  // Integritaet
        '#B16': 72,  // Selbstentfaltung
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AromantischProfil;
}
if (typeof window !== 'undefined') {
    window.AromantischProfil = AromantischProfil;
}
