/**
 * js/core/tooltips.js
 * Dimension tooltip definitions, archetype icons, and category names.
 * Pure data - no dependencies.
 *
 * Exports: TiageTooltips
 */
const TiageTooltips = (function() {
    'use strict';

    const dimensionTooltips = {
        geschlecht: {
            title: "Geschlecht",
            text: "Dein Geschlecht. Dies beeinflusst die körperliche Anziehung zusammen mit der sexuellen Orientierung."
        },
        dominanz: {
            title: "Dominanz-Präferenz",
            text: "Welche Rolle bevorzugst du in der emotionalen und praktischen Beziehungsdynamik?\n\n• <span style=\"color: #e74c3c; font-weight: bold;\">Dominant</span>: Du übernimmst gerne Führung und Verantwortung\n• <span style=\"color: #e74c3c; font-weight: bold;\">Submissiv</span>: Du lässt dich gerne führen und vertraust auf deinen Partner\n• <span style=\"color: #e74c3c; font-weight: bold;\">Switch</span>: Du genießt beide Rollen je nach Situation\n• <span style=\"color: #e74c3c; font-weight: bold;\">Ausgeglichen</span>: Du bevorzugst eine gleichberechtigte Dynamik ohne feste Rollen\n\nDie Dominanz-Harmonie beeinflusst die energetische Dynamik einer Beziehung. Komplementäre Präferenzen (z.B. dominant + submissiv) können starke Anziehung erzeugen."
        },
        orientierung: {
            title: "Sexuelle Orientierung",
            text: "Zu welchem Geschlecht fühlst du dich romantisch und/oder sexuell hingezogen?\n\n• Heterosexuell: Anziehung zum anderen Geschlecht\n• Homosexuell: Anziehung zum gleichen Geschlecht\n• Bi-/Pansexuell: Anziehung zu mehreren oder allen Geschlechtern\n\nDie sexuelle Orientierung beeinflusst, ob eine körperliche/romantische Anziehung zwischen zwei Personen möglich ist. Bei inkompatiblen Orientierungen zeigt das Modell dies als Blocker an."
        },
        orientierungKO: {
            title: "KO-Kriterien für Orientierung (v4.1.1 - Primär/Sekundär)",
            text: "<strong>\ud83d\udccc PRIMÄR / SEKUNDÄR System:</strong>\n\n• <span style=\"color: #3498db; font-weight: bold;\">Erste Auswahl = PRIMÄR</span> (Hauptorientierung)\n• <span style=\"color: #9b59b6; font-weight: bold;\">Weitere Auswahlen = SEKUNDÄR</span> (Exploration, Offenheit)\n\n<strong>\ud83d\udeab Nur EINE Regel:</strong>\n\n• <span style=\"color: #e74c3c; font-weight: bold;\">Hetero + Gay/Lesbisch</span> sind inkompatibel (logischer Widerspruch)\n\n<strong>\u2705 ERLAUBTE Kombinationen:</strong>\n\n• <span style=\"color: #2ecc71;\">Hetero (primär) + Pan (sekundär)</span>\n• <span style=\"color: #2ecc71;\">Hetero (primär) + Queer (sekundär)</span>\n• <span style=\"color: #2ecc71;\">Gay (primär) + Pan (sekundär)</span>\n• <span style=\"color: #2ecc71;\">Gay (primär) + Bi (sekundär)</span>\n• <span style=\"color: #2ecc71;\">Bi + Pan + Queer</span> (alle Kombinationen)\n\n<strong>\u274c NICHT erlaubt:</strong>\n\n• <span style=\"color: #e74c3c;\">Hetero + Gay</span> (Widerspruch)\n• <span style=\"color: #e74c3c;\">Gay + Hetero</span> (Widerspruch)\n\n<strong>\ud83d\udca1 Beispiel:</strong>\n\"Ich bin hauptsächlich heterosexuell (primär), aber offen für pansexuelle Erfahrungen (sekundär)\" \u2192 \u2705 Hetero + Pan\n\n<em>Warum?</em> Orientierung ist nicht binär. Viele Menschen haben eine primäre Präferenz mit sekundärer Offenheit."
        },
        status: {
            title: "Orientierungs-Status",
            text: "Gelebt: Du lebst diese Orientierung und bist dir sicher.\n\nInteressiert: Du bist neugierig oder in einer Explorationsphase. Die tatsächliche Anziehung ist noch unklar."
        },
        dominanzStatus: {
            title: "Dominanz-Status",
            text: "Gelebt: Du kennst deine Dominanz-Präferenz und lebst sie aktiv. Die Werte des psychologischen Profils treffen mit hoher Wahrscheinlichkeit zu.\n\nInteressiert: Du bist noch am Erkunden oder unsicher über deine Präferenz. Die Konfidenz der Profilaussagen ist reduziert (höhere Varianz in deinem Verhalten).\n\nWissenschaftliche Basis: Big Five Forschung zeigt, dass Menschen in Explorationsphasen konsistent höhere Verhaltensvarianzen aufweisen (McCrae & Costa, 1997)."
        },
        // Einzelne Dominanz-Typen
        dominant: {
            title: "Dominant",
            text: "<strong>Der Führende</strong>\n\nDu übernimmst gerne Führung und Verantwortung in Beziehungen.\n\n<strong>Merkmale:</strong> Assertiv, führend, selbstsicher, bestimmend, proaktiv, entschlossen\n\n<strong>Kommunikation:</strong> Direkt und unverblümt. Konflikte werden aktiv angegangen, nicht vermieden.\n\n<strong>Energie:</strong> Hoch, spontan, leidenschaftlich. Erholt sich schnell von Konflikten.\n\n<em>Pirsig:</em> Dominanz als dynamische Kraft, die statische Muster durchbricht.\n<em>OSHO:</em> Yang-Energie – natürlich wenn sie aus Bewusstsein kommt, nicht aus Ego."
        },
        submissiv: {
            title: "Submissiv",
            text: "<strong>Der Folgende</strong>\n\nDu lässt dich gerne führen und vertraust auf deinen Partner.\n\n<strong>Merkmale:</strong> Anpassungsfähig, folgend, empathisch, dienend, harmonieorientiert, geduldig\n\n<strong>Kommunikation:</strong> Indirekt und diplomatisch. Konflikte werden eher vermieden oder sanft angesprochen.\n\n<strong>Energie:</strong> Mittel, präferiert Planung. Braucht Zeit zur Erholung nach Konflikten.\n\n<em>Pirsig:</em> Submissivität als statisches Muster, das Stabilität schafft.\n<em>OSHO:</em> Yin-Energie – Empfangen ist genauso wertvoll wie Geben."
        },
        switch: {
            title: "Switch",
            text: "<strong>Der Flexible</strong>\n\nDu genießt beide Rollen je nach Situation und Partner.\n\n<strong>Merkmale:</strong> Flexibel, wandelbar, vielseitig, situativ, kommunikativ, experimentierfreudig\n\n<strong>Kommunikation:</strong> Situativ angepasst – kann sowohl direkt als auch diplomatisch sein.\n\n<strong>Energie:</strong> Hoch und flexibel. Kann sich schnell an verschiedene Situationen anpassen.\n\n<em>Pirsig:</em> Balance zwischen statisch und dynamisch – höchste Adaptivität.\n<em>OSHO:</em> Die Vereinigung von Yin und Yang. Der erleuchtete Mensch trägt beide Polaritäten."
        },
        ausgeglichen: {
            title: "Ausgeglichen",
            text: "<strong>Der Zentrierte</strong>\n\nDu bevorzugst eine gleichberechtigte Dynamik ohne feste Rollen.\n\n<strong>Merkmale:</strong> Balanciert, harmonisch, stabil, ruhig, besonnen, gemäßigt\n\n<strong>Kommunikation:</strong> Ruhig und konstruktiv. Feedback ist ausgewogen zwischen direkt und diplomatisch.\n\n<strong>Energie:</strong> Mittel und stabil – weder übermäßig spontan noch übermäßig planend.\n\n<em>Pirsig:</em> Wahre Balance zwischen statisch und dynamisch.\n<em>OSHO:</em> Jenseits von Yin und Yang – die transzendierte Mitte."
        },
        // GFK (Gewaltfreie Kommunikation)
        gfk: {
            title: "GFK-Kompetenz",
            text: "<strong>Gewaltfreie Kommunikation nach Marshall Rosenberg</strong>\n\nWie gut beherrschst du die Prinzipien der Gewaltfreien Kommunikation?\n\n• <strong>Niedrig:</strong> Tendenz zu Vorwürfen, Urteilen, Schuldzuweisungen. Schwierigkeiten, Bedürfnisse klar zu benennen.\n\n• <strong>Mittel:</strong> Grundkenntnisse vorhanden. Kann in ruhigen Momenten GFK anwenden, fällt unter Stress in alte Muster zurück.\n\n• <strong>Hoch:</strong> Konsequente Anwendung der 4 Schritte: Beobachtung, Gefühl, Bedürfnis, Bitte. Empathisches Zuhören auch in Konflikten.\n\n<em>Pirsig:</em> GFK als dynamische Qualität – die Fähigkeit, im Moment präsent zu kommunizieren.\n<em>OSHO:</em> Wahre Kommunikation entsteht ohne Ego – GFK ist ein Werkzeug dafür."
        },
        gfk_niedrig: {
            title: "GFK: Niedrig",
            text: "<strong>Geringe GFK-Kompetenz</strong>\n\nKommunikation basiert oft auf:\n• Vorwürfen und Schuldzuweisungen\n• Urteilen und Bewertungen\n• Forderungen statt Bitten\n• Schwierigkeiten, eigene Bedürfnisse zu erkennen\n\n<strong>In Beziehungen:</strong> Konflikte eskalieren häufiger. Missverständnisse sind alltäglich. Verletzungen entstehen unbeabsichtigt.\n\n<strong>Potenzial:</strong> GFK kann gelernt werden. Bewusstsein ist der erste Schritt."
        },
        gfk_mittel: {
            title: "GFK: Mittel",
            text: "<strong>Mittlere GFK-Kompetenz</strong>\n\nKommunikation zeigt:\n• Grundverständnis der 4 Schritte (Beobachtung, Gefühl, Bedürfnis, Bitte)\n• Fähigkeit zur Selbstreflexion\n• In ruhigen Momenten empathisches Zuhören\n• Unter Stress Rückfall in alte Muster\n\n<strong>In Beziehungen:</strong> Gute Basis für konstruktive Gespräche. Konflikte können gelöst werden, wenn beide bereit sind.\n\n<strong>Wachstum:</strong> Übung unter Druck vertieft die Kompetenz."
        },
        gfk_hoch: {
            title: "GFK: Hoch",
            text: "<strong>Hohe GFK-Kompetenz</strong>\n\nKommunikation geprägt von:\n• Konsequente Anwendung der 4 Schritte\n• Empathisches Zuhören auch in Konflikten\n• Fähigkeit, hinter Vorwürfe zu hören\n• Klare Unterscheidung: Beobachtung vs. Bewertung\n• Verbindung zu eigenen und fremden Bedürfnissen\n\n<strong>In Beziehungen:</strong> Tiefe Verbindung durch echtes Verstehen. Konflikte werden zu Wachstumschancen.\n\n<em>OSHO:</em> Kommunikation ohne Ego ist Meditation in Aktion."
        },
        // Einzelne Orientierungen
        heterosexuell: {
            title: "Heterosexuell",
            text: "<strong>Anziehung zum anderen Geschlecht</strong>\n\nDu fühlst dich romantisch und/oder sexuell zu Menschen des anderen Geschlechts hingezogen.\n\n<strong>Forschung:</strong> Die häufigste sexuelle Orientierung. Studien zeigen tendentiell traditionellere Wertorientierung."
        },
        homosexuell: {
            title: "Homosexuell",
            text: "<strong>Anziehung zum gleichen Geschlecht</strong>\n\nDu fühlst dich romantisch und/oder sexuell zu Menschen des gleichen Geschlechts hingezogen.\n\n<strong>Forschung:</strong> Höhere Offenheit für neue Erfahrungen (Allen et al., 2020). Tendentiell weniger traditionelle Wertorientierung."
        },
        bisexuell: {
            title: "Bisexuell",
            text: "<strong>Anziehung zu beiden Geschlechtern</strong>\n\nDu fühlst dich romantisch und/oder sexuell zu Menschen beider Geschlechter hingezogen.\n\n<strong>Forschung:</strong> Höchste Offenheit aller Orientierungen (Allen et al., 2020). Am experimentierfreudigsten und am wenigsten traditionell."
        }
    };

    const icons = {
        single: '\u2605',
        duo: '\u2661',
        duo_flex: '\u26A1',
        solopoly: '\u25C6',
        polyamor: '\u2665',
        ra: '\u221E',
        lat: '\u2302',
        aromantisch: '\u25C7'
    };

    const categoryNames = {
        A: 'Beziehungsphilosophie',
        B: 'Werte-Alignment',
        C: 'N\u00e4he-Distanz',
        D: 'Autonomie',
        E: 'Kommunikation',
        F: 'Soziale Kompatibilit\u00e4t'
    };

    // Public API
    return {
        dimensionTooltips: dimensionTooltips,
        icons: icons,
        categoryNames: categoryNames
    };
})();

// Export for other modules
if (typeof window !== 'undefined') {
    window.TiageTooltips = TiageTooltips;
}
