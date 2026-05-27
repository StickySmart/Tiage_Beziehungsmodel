/**
 * DUO - Archetyp-Basisprofil v5.0
 * 16 Grundbeduerfnisse nach Volker Schmidt | Werte: Durchschnitt aus Ti-Age v4.x
 */

const DuoProfil = {
    id: "duo",
    name: "Duo",
    beschreibung: "Tiefe Verschmelzung, Sicherheit und exklusive Bindung. Zwei werden eins.",

    umfrageWerte: {
        // --- Stufe 1: Passive Basisbedurfnisse
        '#B1': 68,  // Wohlbefinden
        '#B2': 92,  // Sicherheit — DUO braucht hohe Sicherheit vom EINEN Partner
        '#B3': 58,  // Leichtigkeit
        '#B4': 67,  // Orientierung
        // --- Stufe 2: Handlungs-Bedurfnisse
        '#B5': 57,  // Wirksamkeit
        '#B6': 28,  // Freiheit — DUO lebt IN Exklusivität, nicht für Freiheit
        '#B7': 61,  // Intensitaet
        '#B8': 79,  // Entwicklung
        // --- Stufe 3: Soziale Bedurfnisse
        '#B9': 60,  // Gemeinschaft — Fokus auf das Paar, weniger auf Netzwerk
        '#B10': 83,  // Anerkennung
        '#B11': 59,  // Gerechtigkeit
        '#B12': 88,  // Verbundenheit — tiefe exklusive Bindung
        // --- Stufe 4: Identitaets-Bedurfnisse
        '#B13': 68,  // Selbsterkenntnis
        '#B14': 63,  // Sinn
        '#B15': 87,  // Integritaet — Treue und Exklusivität als Kernwert
        '#B16': 88,  // Selbstentfaltung
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DuoProfil;
}
if (typeof window !== 'undefined') {
    window.DuoProfil = DuoProfil;
}
