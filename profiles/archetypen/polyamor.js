/**
 * POLYAMOR - Archetyp-Basisprofil v5.0
 * 16 Grundbeduerfnisse nach Volker Kiel | Werte: Durchschnitt aus Ti-Age v4.x
 */

const PolyamorProfil = {
    id: "polyamor",
    name: "Polyamor",
    beschreibung: "Liebe multipliziert sich. Mehrere tiefe gleichwertige Verbindungen.",

    umfrageWerte: {
        // --- Stufe 1: Passive Basisbedurfnisse
        '#B1': 64,  // Wohlbefinden
        '#B2': 68,  // Sicherheit
        '#B3': 62,  // Leichtigkeit
        '#B4': 68,  // Orientierung
        // --- Stufe 2: Handlungs-Bedurfnisse
        '#B5': 80,  // Wirksamkeit
        '#B6': 74,  // Freiheit
        '#B7': 63,  // Intensitaet
        '#B8': 76,  // Entwicklung
        // --- Stufe 3: Soziale Bedurfnisse
        '#B9': 81,  // Gemeinschaft
        '#B10': 79,  // Anerkennung
        '#B11': 67,  // Gerechtigkeit
        '#B12': 84,  // Verbundenheit
        // --- Stufe 4: Identitaets-Bedurfnisse
        '#B13': 81,  // Selbsterkenntnis
        '#B14': 73,  // Sinn
        '#B15': 64,  // Integritaet
        '#B16': 84,  // Selbstentfaltung
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PolyamorProfil;
}
if (typeof window !== 'undefined') {
    window.PolyamorProfil = PolyamorProfil;
}
