/**
 * js/core/archetypeDescriptions.js
 * Archetype UI descriptions - pure data, no dependencies.
 * Exports: TiageArchetypeDescriptions
 */
const TiageArchetypeDescriptions = (function() {
    'use strict';

    const archetypeDescriptions = {
        single: {
            name: "Single",
            shortDef: "Bewusste Entscheidung für ein autonomes Leben ohne Primärbeziehung als dauerhafte Lebensform.",
            longDef: "Single-orientierte Menschen haben sich aktiv für ein Leben ohne dauerhafte romantische Partnerschaft entschieden. Dies ist keine Übergangsphase ('zwischen Beziehungen'), sondern eine bewusste Lebensform, die Selbstgenügsamkeit und persönliche Autonomie als zentrale Werte sieht. Soziale Kontakte, Freundschaften und gelegentliche romantische/sexuelle Begegnungen sind möglich, aber keine feste Partnerschaft wird angestrebt.",
            keyPrinciples: [
                "Selbstgenügsamkeit als Wert, nicht als Mangel",
                "Persönliche Autonomie über Verbindlichkeit",
                "Beziehungen als Option, nicht als Notwendigkeit",
                "Erfüllung durch Selbst, Freunde, Projekte"
            ],
            notTheSameAs: [
                "'Zwischen Beziehungen' sein",
                "'Noch nicht den Richtigen gefunden'",
                "Beziehungsunfähig oder bindungsängstlich",
                "Einsam oder unglücklich"
            ],
            variants: [
                "Aromantisch-Single: Keine romantischen Gefühle, kein Bedürfnis danach",
                "Bewusst-autonom: Positive Entscheidung für Freiheit",
                "Beziehungs-kritisch: Bevorzugt Unabhängigkeit"
            ]
        },
        duo: {
            name: "Duo",
            shortDef: "Traditionelle monogame Zweierbeziehung mit Exklusivität und gemeinsamer Lebensgestaltung als Kernprinzip.",
            longDef: "Duo-orientierte Menschen leben in oder suchen eine klassische Zweierbeziehung mit romantischer und sexueller Exklusivität. Die Partnerschaft steht im Zentrum der Lebensgestaltung und wird als primäre emotionale und soziale Einheit verstanden. Gemeinsame Ziele, Alltag und Zukunftsplanung werden als Paar gestaltet.",
            keyPrinciples: [
                "Exklusivität als Ausdruck von Verbindlichkeit",
                "'Wir' als zentrale Einheit über 'Ich'",
                "Tiefe durch Fokussierung auf eine Person",
                "Gemeinsame Lebensgestaltung und Zukunftsplanung",
                "Treue als emotionale und sexuelle Exklusivität"
            ],
            notTheSameAs: [
                "Besitzdenken oder Kontrolle",
                "Verlust der eigenen Identität",
                "'Alte' oder 'überholte' Beziehungsform",
                "Langweilig oder unerfüllt"
            ],
            variants: [
                "Traditionell-Duo: Klassisches Ehe-Modell",
                "Modern-Duo: Ohne Trauschein, flexiblere Rollen",
                "Intensiv-Duo: Sehr enge emotionale Verschmelzung"
            ]
        },
        duo_flex: {
            name: "Duo-Flex",
            shortDef: "Primäre Zweierbeziehung mit vereinbarten Öffnungen für zusätzliche Kontakte unter klaren Regeln.",
            longDef: "Duo-Flex-orientierte Menschen leben in einer Hauptbeziehung mit einem Primärpartner, öffnen diese aber bewusst und einvernehmlich für weitere Kontakte. Die Primärbeziehung bleibt zentral und privilegiert. Alle Öffnungen erfolgen transparent und nach gemeinsam vereinbarten Regeln.",
            keyPrinciples: [
                "Primärbeziehung als Anker und Priorität",
                "Sexuelle/romantische Vielfalt ohne Hierarchie-Aufgabe",
                "Ehrlichkeit und Transparenz über alle Kontakte",
                "Regeln schützen die Hauptbeziehung",
                "Freiheit innerhalb vereinbarter Grenzen"
            ],
            notTheSameAs: [
                "Untreue oder Betrug (alles ist abgesprochen!)",
                "'Beziehung retten' durch Öffnung",
                "Fehlende Verbindlichkeit",
                "Übergangsphase zu Polyamorie"
            ],
            variants: [
                "Swinging/Lifestyle: Gemeinsame sexuelle Erlebnisse",
                "Open Relationship: Individuelle sexuelle Freiheit",
                "Hierarchisches Poly: Primärpartner + Nebenbeziehungen"
            ]
        },
        solopoly: {
            name: "Solopoly",
            shortDef: "Mehrere gleichwertige Beziehungen bei bewusster Bewahrung der eigenen Autonomie - keine Primärpartner.",
            longDef: "Solopoly-orientierte Menschen führen mehrere romantische und/oder sexuelle Beziehungen parallel, ohne eine davon als 'Hauptbeziehung' zu priorisieren. Die persönliche Autonomie steht im Zentrum: Kein Zusammenziehen, keine gemeinsame Haushaltsführung. 'Ich bin mein eigener Primärpartner'.",
            keyPrinciples: [
                "Autonomie als höchster Wert - auch in Beziehungen",
                "Mehrere gleichwertige Beziehungen ohne Hierarchie",
                "Keine Verschmelzung oder gemeinsame Haushalte",
                "'Ich bin mein eigener Primärpartner'",
                "Liebe ohne Aufgabe der Unabhängigkeit"
            ],
            notTheSameAs: [
                "Bindungsangst oder Commitment-Probleme",
                "'Light-Version' von Polyamorie",
                "Egoistisch oder beziehungsunfähig",
                "Zwischenstufe zu 'richtiger' Partnerschaft"
            ],
            variants: [
                "Stark-autonom: Sehr klare Grenzen",
                "Beziehungs-balanciert: Tiefe Beziehungen, getrennte Wohnungen",
                "Netzwerk-orientiert: Viele gleichwertige Connections"
            ]
        },
        ra: {
            name: "RA",
            shortDef: "Vollständige Ablehnung von Beziehungshierarchien und gesellschaftlichen Normen.",
            longDef: "RAs hinterfragen alle gesellschaftlichen Beziehungsnormen radikal. Keine Beziehung ist 'höher' als eine andere - Freundschaften können genauso wichtig sein wie romantische Beziehungen. Jede Verbindung wird individuell definiert, ohne externe Vorlagen.",
            keyPrinciples: [
                "Keine Hierarchien zwischen Beziehungstypen",
                "Jede Beziehung wird individuell definiert",
                "Ablehnung gesellschaftlicher Beziehungsnormen",
                "Autonomie als höchster Wert",
                "Keine Besitzansprüche an andere Menschen"
            ],
            notTheSameAs: [
                "Beziehungsunfähig oder bindungsscheu",
                "Chaotisch oder regellos",
                "Verantwortungslos",
                "Gegen Commitment generell"
            ],
            variants: [
                "Anarchisch-vernetzt: Viele gleichwertige Verbindungen",
                "Philosophisch-RA: Tiefe Reflexion über Normen",
                "Pragmatisch-RA: Flexible Anwendung der Prinzipien"
            ]
        },
        lat: {
            name: "LAT (Living Apart Together)",
            shortDef: "Feste Partnerschaft mit bewusst getrennten Wohnungen und Alltagsleben.",
            longDef: "LAT-orientierte Menschen wünschen sich tiefe, verbindliche Beziehungen, aber mit klarer räumlicher und alltäglicher Autonomie. Die eigenen vier Wände sind kein Zeichen von Distanz, sondern von gesunder Selbstfürsorge.",
            keyPrinciples: [
                "Liebe braucht kein gemeinsames Dach",
                "Eigener Rückzugsraum ist essentiell",
                "Qualitätszeit über Quantität",
                "Autonomie im Alltag",
                "Bewusste Entscheidung für Nähe"
            ],
            notTheSameAs: [
                "Bindungsangst oder Commitment-Phobie",
                "Fernbeziehung aus Zwang",
                "Halbe Beziehung oder weniger ernst",
                "Übergangsphase zum Zusammenziehen"
            ],
            variants: [
                "Nachbarschafts-LAT: Getrennte Wohnungen in der Nähe",
                "Wochenend-LAT: Intensives Zeit-teilen am Wochenende",
                "Flexibel-LAT: Situative Anpassung der Nähe"
            ]
        },
        aromantisch: {
            name: "Aromantisch",
            shortDef: "Wenig oder keine romantische Anziehung, aber tiefe Verbindungen auf anderen Ebenen.",
            longDef: "Aromantische Menschen erleben wenig bis keine romantische Anziehung zu anderen. Das bedeutet nicht, dass sie keine tiefen Verbindungen haben können - Freundschaften, queerplatonische Beziehungen und andere Formen von Nähe sind möglich und wertvoll.",
            keyPrinciples: [
                "Romantische Liebe ist nicht die einzige Tiefe",
                "Freundschaften können primäre Beziehungen sein",
                "Ehrlichkeit über eigene Grenzen",
                "Keine Verpflichtung zu romantischen Gefühlen",
                "Alternative Beziehungsformen werden wertgeschätzt"
            ],
            notTheSameAs: [
                "Kalt oder gefühllos",
                "Antisozial oder einsam",
                "Noch nicht die richtige Person gefunden",
                "Psychische Störung oder Defizit"
            ],
            variants: [
                "Greyromantisch: Seltene romantische Anziehung",
                "Demiromantisch: Romantik nur nach tiefer Bindung",
                "Queerplatonisch: Tiefe nicht-romantische Primärbeziehungen"
            ]
        },
        polyamor: {
            name: "Polyamor",
            shortDef: "Mehrere gleichzeitige, ethisch geführte Liebesbeziehungen mit Transparenz und emotionalem Commitment.",
            longDef: "Polyamor-orientierte Menschen führen mehrere romantische Beziehungen parallel, die alle auf Ehrlichkeit, Einvernehmlichkeit und Transparenz basieren. Tiefe Verschmelzung, Zusammenleben und gemeinsame Zukunftsplanung mit mehreren Partnern sind möglich und erwünscht. Alle Beteiligten wissen voneinander.",
            keyPrinciples: [
                "Liebe ist nicht begrenzt oder exklusiv",
                "Ehrlichkeit und Transparenz gegenüber allen",
                "Konsens und Einvernehmlichkeit als Basis",
                "Emotionale Tiefe zu mehreren Menschen",
                "Kommunikation als zentrale Kompetenz"
            ],
            notTheSameAs: [
                "Untreue oder Betrug (alle wissen Bescheid!)",
                "Bindungsunfähigkeit",
                "Nur Sex ohne Gefühle",
                "Chaotisch oder unkontrolliert"
            ],
            variants: [
                "Hierarchisches Poly: Primär-, Sekundärpartner",
                "Nicht-hierarchisches Poly: Alle gleichwertig",
                "Kitchen-Table-Poly: Alle Partner verstehen sich",
                "Parallel-Poly: Partner kennen sich, wenig Kontakt"
            ]
        }
    };

    return { archetypeDescriptions: archetypeDescriptions };
})();

if (typeof window !== 'undefined') {
    window.TiageArchetypeDescriptions = TiageArchetypeDescriptions;
}
