/**
 * js/core/tagTooltips.js
 * Tag tooltip content for type combinations and normalizeTagName helper.
 * Pure data + helper, no dependencies.
 * Exports: TiageTagTooltips
 */
const TiageTagTooltips = (function() {
    'use strict';

    const tagTooltipContent = {
        // Single × Polyamor (niedrige Kompatibilität - Priorität)
        "polyamor-single": {
            "A": {
                "exklusivitaets-erwartung": {
                    type1Perspective: "Singles haben keine aktive Exklusivitäts-Erwartung, da sie bewusst ohne Primärbeziehung leben.",
                    type2Perspective: "Polyamor-Menschen lehnen Exklusivität als Grundprinzip ab - Liebe wird als nicht-begrenzt verstanden.",
                    dynamic: "Beide lehnen Exklusivität ab, aber aus völlig verschiedenen Gründen: Single will keine Beziehung, Polyamor will mehrere gleichzeitig."
                },
                "offenheit-fuer-alternative-modelle": {
                    type1Perspective: "Singles sind theoretisch offen, haben aber keine aktive Beziehungspraxis.",
                    type2Perspective: "Polyamor lebt alternative Modelle aktiv mit mehreren gleichzeitigen Liebesbeziehungen.",
                    dynamic: "Potenzielle Brücke: Ein Single könnte Polyamorie entdecken, wenn die Autonomie gewahrt bleibt."
                },
                "beziehung-als-lebensinhalt-vs-lebensbereich": {
                    type1Perspective: "Für Singles ist Beziehung kein zentraler Lebensinhalt - Selbstgenügsamkeit steht im Vordergrund.",
                    type2Perspective: "Für Polyamor sind Beziehungen sehr zentral, aber als Netzwerk statt als einzelne Partnerschaft.",
                    dynamic: "Grundlegend verschiedene Lebensentwürfe: Beziehungsfreiheit vs. Beziehungsvielfalt als Ideal."
                }
            },
            "B": {
                "definition-von-treue": {
                    type1Perspective: "Treue ist für Singles kein relevantes Konzept, da keine Beziehungsverpflichtungen bestehen.",
                    type2Perspective: "Treue bedeutet für Polyamor Ehrlichkeit und Transparenz, nicht Exklusivität.",
                    dynamic: "Verschiedene Bedeutungen: Für Single irrelevant, für Polyamor transformiert - aber nicht abwesend."
                },
                "ethische-grundhaltung": {
                    type1Perspective: "Singles praktizieren Selbstverantwortung ohne Rechenschaftspflicht gegenüber Partnern.",
                    type2Perspective: "Polyamor betont ethische Verantwortung gegenüber allen Beziehungspartnern.",
                    dynamic: "Single lebt für sich, Polyamor für ein Netzwerk - unterschiedliche ethische Bezugsrahmen."
                },
                "verantwortungsbewusstsein": {
                    type1Perspective: "Verantwortung liegt primär bei sich selbst und eigenen Lebensentscheidungen.",
                    type2Perspective: "Verantwortung erstreckt sich auf mehrere Partner und deren emotionale Bedürfnisse.",
                    dynamic: "Einzelverantwortung vs. Netzwerkverantwortung - fundamental verschiedene Komplexitätsgrade."
                }
            },
            "C": {
                "emotionale-verschmelzungs-tendenz": {
                    type1Perspective: "Singles meiden emotionale Verschmelzung zugunsten von Selbstgenügsamkeit.",
                    type2Perspective: "Polyamor sucht emotionale Tiefe mit mehreren Menschen gleichzeitig.",
                    dynamic: "Singles wahren Distanz, Polyamor sucht Nähe - aber verteilt auf mehrere Personen."
                },
                "physische-naehe-beduerfnisse": {
                    type1Perspective: "Physische Nähe ist für Singles optional und situativ, nicht strukturell verankert.",
                    type2Perspective: "Polyamor hat oft hohe physische Nähe-Bedürfnisse zu mehreren Partnern.",
                    dynamic: "Singles regulieren Nähe selbst, Polyamor jongliert Nähe-Bedürfnisse im Netzwerk."
                },
                "faehigkeit-raum-zu-geben": {
                    type1Perspective: "Singles brauchen viel Raum und sind geübt darin, diesen zu verteidigen.",
                    type2Perspective: "Polyamor gibt Raum durch verteilte Aufmerksamkeit auf mehrere Partner.",
                    dynamic: "Beide können Raum geben - Single durch Abwesenheit, Polyamor durch Verteilung."
                }
            },
            "D": {
                "individuelle-freiheit": {
                    type1Perspective: "Maximale Freiheit ohne Kompromisse - Singles gestalten ihr Leben vollständig selbst.",
                    type2Perspective: "Freiheit innerhalb eines ethischen Beziehungsnetzwerks mit Absprachen.",
                    dynamic: "Absolute vs. verhandelte Freiheit - Singles haben mehr, müssen aber auf Beziehungstiefe verzichten."
                },
                "entscheidungsautonomie": {
                    type1Perspective: "Volle Entscheidungsautonomie ohne Rücksprache oder Kompromisse.",
                    type2Perspective: "Entscheidungsautonomie mit Transparenzpflicht gegenüber allen Partnern.",
                    dynamic: "Singles entscheiden allein, Polyamor kommuniziert - verschiedene Autonomie-Definitionen."
                },
                "akzeptanz-der-autonomie-des-anderen": {
                    type1Perspective: "Singles respektieren Autonomie anderer, da sie selbst maximale Autonomie leben.",
                    type2Perspective: "Polyamor fördert aktiv die Autonomie aller Partner im Netzwerk.",
                    dynamic: "Passives Respektieren vs. aktives Fördern von Autonomie."
                }
            },
            "E": {
                "kommunikationstiefe": {
                    type1Perspective: "Singles kommunizieren situativ und bei Bedarf, ohne dauerhafte Verpflichtung.",
                    type2Perspective: "Polyamor erfordert tiefe, kontinuierliche Kommunikation mit allen Partnern.",
                    dynamic: "Verschiedene Kommunikationskulturen: Bedarfsorientiert vs. strukturell verankert."
                },
                "konfliktfaehigkeit": {
                    type1Perspective: "Singles können Konflikte durch Rückzug vermeiden - keine Beziehungspflicht.",
                    type2Perspective: "Polyamor muss Konflikte aktiv lösen, um das Netzwerk zu erhalten.",
                    dynamic: "Exit-Option vs. Konfliktlösung als Notwendigkeit - sehr verschiedene Strategien."
                },
                "emotionale-transparenz": {
                    type1Perspective: "Emotionale Transparenz ist optional, da keine festen Beziehungspflichten bestehen.",
                    type2Perspective: "Maximale emotionale Transparenz als ethische Grundlage aller Beziehungen.",
                    dynamic: "Freiwillige vs. verpflichtende Transparenz - unterschiedliche Grundhaltungen."
                }
            },
            "F": {
                "gesellschaftliche-akzeptanz": {
                    type1Perspective: "Singles sind gesellschaftlich akzeptiert, wenn auch manchmal bedauert.",
                    type2Perspective: "Polyamor erfährt oft Stigmatisierung und Unverständnis.",
                    dynamic: "Single ist 'normal', Polyamor muss sich erklären - verschiedene gesellschaftliche Positionen."
                },
                "integration-in-soziale-kreise": {
                    type1Perspective: "Singles integrieren sich individuell und flexibel in soziale Kreise.",
                    type2Perspective: "Polyamor bringt komplexe Beziehungsstrukturen in soziale Kontexte ein.",
                    dynamic: "Einfache vs. komplexe soziale Integration - Singles haben es leichter."
                },
                "umgang-mit-stigma": {
                    type1Perspective: "Singles erleben mildes Stigma ('Wann heiratest du?'), aber keine starke Ablehnung.",
                    type2Perspective: "Polyamor muss aktiv mit Vorurteilen und Abwertung umgehen.",
                    dynamic: "Leichtes vs. starkes Stigma - Polyamor braucht mehr Resilienz."
                }
            }
        },
        // Duo × Polyamor (maximaler Konflikt - Priorität)
        "duo-polyamor": {
            "A": {
                "exklusivitaets-erwartung": {
                    type1Perspective: "Duo sieht Exklusivität als fundamentalen Ausdruck von Liebe und Verbindlichkeit.",
                    type2Perspective: "Polyamor versteht Liebe als nicht-begrenzte Ressource, die sich auf mehrere Menschen erstrecken kann.",
                    dynamic: "Fundamentaler Konflikt: Was für Duo Treue bedeutet, ist für Polyamor eine künstliche Beschränkung."
                },
                "offenheit-fuer-alternative-modelle": {
                    type1Perspective: "Duo bevorzugt das bewährte Zweiermodell und sieht wenig Grund zur Öffnung.",
                    type2Perspective: "Polyamor lebt aktiv ein alternatives Modell und hinterfragt Monogamie-Normen.",
                    dynamic: "Tradition vs. Alternative: Duo fragt 'Warum ändern?', Polyamor fragt 'Warum beschränken?'"
                },
                "beziehung-als-lebensinhalt-vs-lebensbereich": {
                    type1Perspective: "Für Duo ist DIE Beziehung zentraler Lebensinhalt - 'Wir' als Einheit.",
                    type2Perspective: "Für Polyamor sind Beziehungen plural - mehrere gleichwertige 'Wirs'.",
                    dynamic: "Singuläres 'Wir' vs. plurales 'Wir' - grundverschiedene Beziehungsarchitekturen."
                }
            },
            "B": {
                "definition-von-treue": {
                    type1Perspective: "Treue bedeutet exklusive emotionale und sexuelle Bindung an eine Person.",
                    type2Perspective: "Treue bedeutet Ehrlichkeit, Transparenz und Einhalten von Absprachen - nicht Exklusivität.",
                    dynamic: "Maximaler Definitionskonflikt: Duo sieht Untreue, wo Polyamor Transparenz sieht."
                },
                "ethische-grundhaltung": {
                    type1Perspective: "Ethik basiert auf Versprechen, Verbindlichkeit und Fokussierung auf einen Partner.",
                    type2Perspective: "Ethik basiert auf Ehrlichkeit, Konsens und Verantwortung gegenüber allen Beteiligten.",
                    dynamic: "Verschiedene ethische Fundamente: Exklusivitätsethik vs. Transparenzethik."
                },
                "verantwortungsbewusstsein": {
                    type1Perspective: "Verantwortung konzentriert sich auf einen Partner und die gemeinsame Zukunft.",
                    type2Perspective: "Verantwortung verteilt sich auf mehrere Partner und komplexe Beziehungsdynamiken.",
                    dynamic: "Fokussierte vs. verteilte Verantwortung - unterschiedliche Kapazitätsanforderungen."
                }
            },
            "C": {
                "emotionale-verschmelzungs-tendenz": {
                    type1Perspective: "Duo strebt tiefe emotionale Verschmelzung mit einem Partner an.",
                    type2Perspective: "Polyamor erlebt emotionale Tiefe mit mehreren Menschen, aber weniger Verschmelzung pro Person.",
                    dynamic: "Intensive Tiefe zu einem vs. verteilte Tiefe zu mehreren - verschiedene emotionale Ökonomien."
                },
                "physische-naehe-beduerfnisse": {
                    type1Perspective: "Physische Nähe fokussiert sich exklusiv auf den Partner.",
                    type2Perspective: "Physische Nähe verteilt sich auf mehrere Partner nach Bedarf und Absprache.",
                    dynamic: "Exklusive vs. geteilte Intimität - kann für Duo als Verlust erlebt werden."
                },
                "faehigkeit-raum-zu-geben": {
                    type1Perspective: "Duo gibt Raum innerhalb der Partnerschaft, aber nicht für andere Beziehungen.",
                    type2Perspective: "Polyamor muss Raum für alle Partner schaffen und ausbalancieren.",
                    dynamic: "Raum für Individuum vs. Raum für andere Beziehungen - verschiedene Raumkonzepte."
                }
            },
            "D": {
                "individuelle-freiheit": {
                    type1Perspective: "Freiheit wird gemeinsam als Paar definiert und gelebt.",
                    type2Perspective: "Individuelle Freiheit schließt Freiheit für mehrere Liebesbeziehungen ein.",
                    dynamic: "Paar-Freiheit vs. individuelle Beziehungsfreiheit - verschiedene Freiheitsbegriffe."
                },
                "entscheidungsautonomie": {
                    type1Perspective: "Wichtige Entscheidungen werden als Paar getroffen.",
                    type2Perspective: "Individuelle Autonomie auch bei Beziehungsentscheidungen, mit Transparenz.",
                    dynamic: "Gemeinsame vs. individuelle Entscheidungsmacht - kann zu Konflikten führen."
                },
                "akzeptanz-der-autonomie-des-anderen": {
                    type1Perspective: "Autonomie des Partners wird anerkannt, aber nicht für andere Beziehungen.",
                    type2Perspective: "Autonomie schließt explizit die Freiheit für weitere Liebesbeziehungen ein.",
                    dynamic: "Begrenzte vs. unbegrenzte Autonomie-Akzeptanz - Kernkonflikt dieser Kombination."
                }
            },
            "E": {
                "kommunikationstiefe": {
                    type1Perspective: "Tiefe Kommunikation mit einem Partner über alle Lebensaspekte.",
                    type2Perspective: "Tiefe Kommunikation mit mehreren Partnern, plus Meta-Kommunikation über Beziehungen.",
                    dynamic: "Verschiedene Kommunikationsanforderungen: Duo ist intensiv, Polyamor ist extensiv."
                },
                "konfliktfaehigkeit": {
                    type1Perspective: "Konflikte werden zu zweit gelöst, ohne externe Beziehungen.",
                    type2Perspective: "Konflikte können mehrere Partner betreffen und erfordern komplexe Lösungen.",
                    dynamic: "Bilaterale vs. multilaterale Konfliktlösung - verschiedene Komplexitätsgrade."
                },
                "emotionale-transparenz": {
                    type1Perspective: "Emotionale Transparenz primär gegenüber dem einen Partner.",
                    type2Perspective: "Emotionale Transparenz gegenüber allen Partnern als ethische Basis.",
                    dynamic: "Duo kann Transparenz gegenüber 'Dritten' als Verrat empfinden - Polyamor als Grundlage."
                }
            },
            "F": {
                "gesellschaftliche-akzeptanz": {
                    type1Perspective: "Duo entspricht der gesellschaftlichen Norm und genießt volle Akzeptanz.",
                    type2Perspective: "Polyamor muss gegen Vorurteile und mangelndes Verständnis kämpfen.",
                    dynamic: "Norm vs. Abweichung - Duo hat soziale Vorteile, Polyamor soziale Hürden."
                },
                "integration-in-soziale-kreise": {
                    type1Perspective: "Duo wird als 'normales' Paar problemlos in alle Kontexte integriert.",
                    type2Perspective: "Polyamor muss erklären, verbergen oder mit Unverständnis umgehen.",
                    dynamic: "Reibungslose vs. erklärungsbedürftige Integration - verschiedene soziale Belastungen."
                },
                "umgang-mit-stigma": {
                    type1Perspective: "Duo erfährt kein Stigma, sondern gesellschaftliche Unterstützung.",
                    type2Perspective: "Polyamor muss aktiv mit Stigmatisierung und Diskriminierung umgehen.",
                    dynamic: "Privilegierte vs. marginalisierte Position - kann zu Unverständnis führen."
                }
            }
        },
        // Duo-Flex × Solopoly (interessante Balance - Priorität)
        "duo_flex-solopoly": {
            "A": {
                "exklusivitaets-erwartung": {
                    type1Perspective: "Duo-Flex hält an einer Primärbeziehung fest, öffnet aber für Zusatzkontakte.",
                    type2Perspective: "Solopoly lehnt jede Form von Primärhierarchie ab - alle Beziehungen sind gleichwertig.",
                    dynamic: "Hierarchie vs. Gleichwertigkeit: Duo-Flex braucht einen Anker, Solopoly will keinen."
                },
                "offenheit-fuer-alternative-modelle": {
                    type1Perspective: "Duo-Flex ist offen, aber innerhalb eines strukturierten Rahmens mit Primärpartner.",
                    type2Perspective: "Solopoly lebt maximale Offenheit ohne Verpflichtung zu einer Hauptbeziehung.",
                    dynamic: "Gerahmte vs. ungerahmte Offenheit - beide alternativ, aber verschieden strukturiert."
                },
                "beziehung-als-lebensinhalt-vs-lebensbereich": {
                    type1Perspective: "Die Primärbeziehung ist Lebensinhalt, andere Kontakte sind Bereicherung.",
                    type2Perspective: "Alle Beziehungen sind Lebensbereiche, keiner ist zentraler Lebensinhalt.",
                    dynamic: "Zentrale vs. dezentrale Beziehungsarchitektur - verschiedene Lebensmodelle."
                }
            },
            "B": {
                "definition-von-treue": {
                    type1Perspective: "Treue bedeutet Ehrlichkeit und Prioririsierung des Hauptpartners.",
                    type2Perspective: "Treue bedeutet Ehrlichkeit gegenüber allen, ohne Hierarchie der Wichtigkeit.",
                    dynamic: "Hierarchische vs. egalitäre Treue-Definition - beide ehrlich, anders strukturiert."
                },
                "ethische-grundhaltung": {
                    type1Perspective: "Ethik schützt die Primärbeziehung, Öffnungen erfolgen im Rahmen.",
                    type2Perspective: "Ethik behandelt alle Partner gleich, ohne Vorrang einer Beziehung.",
                    dynamic: "Schutzethik vs. Gleichheitsethik - verschiedene ethische Prioritäten."
                },
                "verantwortungsbewusstsein": {
                    type1Perspective: "Höchste Verantwortung gegenüber dem Primärpartner, dann anderen.",
                    type2Perspective: "Gleiche Verantwortung gegenüber allen Partnern, kein 'mehr' oder 'weniger'.",
                    dynamic: "Gestufte vs. gleiche Verantwortung - kann zu Missverständnissen führen."
                }
            },
            "C": {
                "emotionale-verschmelzungs-tendenz": {
                    type1Perspective: "Emotionale Verschmelzung primär mit dem Hauptpartner.",
                    type2Perspective: "Solopoly meidet Verschmelzung bewusst, um Autonomie zu bewahren.",
                    dynamic: "Selektive Verschmelzung vs. generelle Distanz - verschiedene Nähe-Strategien."
                },
                "physische-naehe-beduerfnisse": {
                    type1Perspective: "Physische Nähe hauptsächlich mit Primärpartner, situativ mit anderen.",
                    type2Perspective: "Physische Nähe gleichmäßig verteilt, kein 'Zuhause' bei einem Partner.",
                    dynamic: "Zentrierte vs. verteilte Intimität - verschiedene Nähe-Modelle."
                },
                "faehigkeit-raum-zu-geben": {
                    type1Perspective: "Raum wird innerhalb der Primärbeziehung verhandelt.",
                    type2Perspective: "Raum ist strukturell gegeben durch separate Lebensräume.",
                    dynamic: "Verhandelter vs. struktureller Raum - Solopoly hat mehr eingebaute Distanz."
                }
            },
            "D": {
                "individuelle-freiheit": {
                    type1Perspective: "Freiheit innerhalb der Primärbeziehungs-Struktur.",
                    type2Perspective: "Maximale individuelle Freiheit als Grundprinzip des Lebens.",
                    dynamic: "Gerahmte vs. maximale Freiheit - verschiedene Autonomie-Level."
                },
                "entscheidungsautonomie": {
                    type1Perspective: "Wichtige Entscheidungen mit Primärpartner, aber mehr Freiraum als Duo.",
                    type2Perspective: "Volle Entscheidungsautonomie, Transparenz statt Absprache.",
                    dynamic: "Abgestimmte vs. informierte Autonomie - verschiedene Entscheidungsprozesse."
                },
                "akzeptanz-der-autonomie-des-anderen": {
                    type1Perspective: "Autonomie wird akzeptiert, solange die Primärbeziehung Priorität bleibt.",
                    type2Perspective: "Autonomie wird bedingungslos akzeptiert - keine Hierarchie-Erwartung.",
                    dynamic: "Bedingte vs. bedingungslose Autonomie-Akzeptanz."
                }
            },
            "E": {
                "kommunikationstiefe": {
                    type1Perspective: "Tiefe Kommunikation mit Primärpartner über alle Aspekte.",
                    type2Perspective: "Situative Kommunikationstiefe je nach Beziehung und Bedarf.",
                    dynamic: "Zentrierte vs. verteilte Kommunikationstiefe."
                },
                "konfliktfaehigkeit": {
                    type1Perspective: "Konflikte primär im Kontext der Hauptbeziehung lösen.",
                    type2Perspective: "Konflikte individuell mit jedem Partner, ohne zentrale Instanz.",
                    dynamic: "Zentralisierte vs. dezentralisierte Konfliktlösung."
                },
                "emotionale-transparenz": {
                    type1Perspective: "Volle Transparenz gegenüber Primärpartner, selektiv gegenüber anderen.",
                    type2Perspective: "Gleichmäßige Transparenz gegenüber allen Partnern.",
                    dynamic: "Gestufte vs. gleiche Transparenz - verschiedene Informationsflüsse."
                }
            },
            "F": {
                "gesellschaftliche-akzeptanz": {
                    type1Perspective: "Duo-Flex kann als 'offene Ehe' noch relativ akzeptiert werden.",
                    type2Perspective: "Solopoly ist schwer zu erklären und wird oft missverstanden.",
                    dynamic: "Relativ akzeptiert vs. erklärungsbedürftig - verschiedene soziale Positionen."
                },
                "integration-in-soziale-kreise": {
                    type1Perspective: "Primärpaar wird integriert, Zusatzkontakte bleiben oft privat.",
                    type2Perspective: "Alle Beziehungen gleichwertig in soziale Kreise integrieren ist komplex.",
                    dynamic: "Einfachere vs. komplexere soziale Integration."
                },
                "umgang-mit-stigma": {
                    type1Perspective: "Mildes Stigma, wenn Öffnung bekannt wird.",
                    type2Perspective: "Stärkeres Stigma durch unkonventionelle Lebensform ohne 'Hauptpartner'.",
                    dynamic: "Verschiedene Stigma-Level - Solopoly ist gesellschaftlich unbekannter."
                }
            }
        },
        // Polyamor × Polyamor (hohe Kompatibilität - Test)
        "polyamor-polyamor": {
            "A": {
                "exklusivitaets-erwartung": {
                    type1Perspective: "Keine Exklusivitäts-Erwartung, Liebe wird als nicht-begrenzt verstanden.",
                    type2Perspective: "Gleiche Grundhaltung: Liebe zu mehreren Menschen ist möglich und ethisch.",
                    dynamic: "Volle Übereinstimmung: Beide verstehen und leben nicht-exklusive Liebe."
                },
                "offenheit-fuer-alternative-modelle": {
                    type1Perspective: "Lebt aktiv ein alternatives Beziehungsmodell.",
                    type2Perspective: "Teilt diese Lebensrealität und die damit verbundenen Werte.",
                    dynamic: "Maximale Synergie: Beide haben den gleichen Referenzrahmen für Beziehungen."
                },
                "beziehung-als-lebensinhalt-vs-lebensbereich": {
                    type1Perspective: "Beziehungen sind zentraler Lebensinhalt, aber als Netzwerk.",
                    type2Perspective: "Versteht und teilt diese Beziehungsarchitektur vollständig.",
                    dynamic: "Geteiltes Verständnis: Beziehungsnetzwerk als gemeinsamer Lebensraum."
                }
            },
            "B": {
                "definition-von-treue": {
                    type1Perspective: "Treue = Ehrlichkeit, Transparenz, Einhalten von Agreements.",
                    type2Perspective: "Gleiche Definition von Treue, ohne Exklusivitätskomponente.",
                    dynamic: "Übereinstimmung bei einem der kritischsten Beziehungskonzepte."
                },
                "ethische-grundhaltung": {
                    type1Perspective: "Ethik basiert auf Konsens, Kommunikation und Respekt.",
                    type2Perspective: "Teilt diese ethischen Grundlagen und praktiziert sie aktiv.",
                    dynamic: "Gemeinsame ethische Basis erleichtert Verhandlungen und Absprachen."
                },
                "verantwortungsbewusstsein": {
                    type1Perspective: "Verantwortung für ein Netzwerk von Beziehungen und Gefühlen.",
                    type2Perspective: "Versteht diese Komplexität und trägt sie mit.",
                    dynamic: "Geteilte Erfahrung mit der Komplexität polyamorer Verantwortung."
                }
            },
            "C": {
                "emotionale-verschmelzungs-tendenz": {
                    type1Perspective: "Emotionale Tiefe mit mehreren Menschen, bewusst dosiert.",
                    type2Perspective: "Gleiche Erfahrung und Kompetenz im Umgang mit verteilter Intimität.",
                    dynamic: "Beide verstehen, wie Tiefe in einem Poly-Kontext funktioniert."
                },
                "physische-naehe-beduerfnisse": {
                    type1Perspective: "Physische Nähe verteilt sich auf mehrere Partner.",
                    type2Perspective: "Akzeptiert und praktiziert geteilte Intimität.",
                    dynamic: "Keine Eifersucht auf physische Nähe mit anderen - geteilte Norm."
                },
                "faehigkeit-raum-zu-geben": {
                    type1Perspective: "Raum für andere Beziehungen ist selbstverständlich.",
                    type2Perspective: "Erwartet und gibt gleichermaßen Raum für das Beziehungsnetzwerk.",
                    dynamic: "Strukturelle Übereinstimmung: Beide brauchen und geben Beziehungs-Raum."
                }
            },
            "D": {
                "individuelle-freiheit": {
                    type1Perspective: "Freiheit für mehrere Liebesbeziehungen als Grundrecht.",
                    type2Perspective: "Teilt dieses Freiheitsverständnis vollständig.",
                    dynamic: "Keine Einschränkung der romantischen Freiheit - beidseitiges Verständnis."
                },
                "entscheidungsautonomie": {
                    type1Perspective: "Autonomie bei Beziehungsentscheidungen, mit Transparenzpflicht.",
                    type2Perspective: "Gleiche Balance zwischen Autonomie und Verantwortung.",
                    dynamic: "Geteilte Entscheidungskultur: Autonom, aber transparent."
                },
                "akzeptanz-der-autonomie-des-anderen": {
                    type1Perspective: "Volle Akzeptanz der Beziehungsfreiheit des Partners.",
                    type2Perspective: "Erwartet und praktiziert die gleiche Akzeptanz.",
                    dynamic: "Wechselseitige Autonomie-Akzeptanz als Fundament der Beziehung."
                }
            },
            "E": {
                "kommunikationstiefe": {
                    type1Perspective: "Tiefe Kommunikation als Kernkompetenz polyanorer Beziehungen.",
                    type2Perspective: "Bringt gleiche Kommunikationsfähigkeiten und -erwartungen mit.",
                    dynamic: "Hohe Kommunikationskompetenz auf beiden Seiten - ideale Voraussetzung."
                },
                "konfliktfaehigkeit": {
                    type1Perspective: "Erfahrung mit komplexen, multilateralen Konflikten.",
                    type2Perspective: "Teilt diese Erfahrung und die entwickelten Lösungsstrategien.",
                    dynamic: "Beide sind 'Poly-geprüft' in Konfliktsituationen - große Resilienz."
                },
                "emotionale-transparenz": {
                    type1Perspective: "Maximale Transparenz als ethische Grundlage.",
                    type2Perspective: "Gleiche Transparenz-Erwartung und -Praxis.",
                    dynamic: "Keine versteckten Emotionen, keine versteckten Beziehungen - klare Basis."
                }
            },
            "F": {
                "gesellschaftliche-akzeptanz": {
                    type1Perspective: "Muss mit gesellschaftlicher Stigmatisierung umgehen.",
                    type2Perspective: "Teilt diese Erfahrung und die entwickelten Coping-Strategien.",
                    dynamic: "Gemeinsame Außenseiter-Position kann verbinden und stärken."
                },
                "integration-in-soziale-kreise": {
                    type1Perspective: "Komplexe Beziehungsstrukturen in soziale Kontexte einbringen.",
                    type2Perspective: "Versteht und teilt diese Herausforderung.",
                    dynamic: "Gegenseitige Unterstützung bei sozialer Navigation."
                },
                "umgang-mit-stigma": {
                    type1Perspective: "Aktiver Umgang mit Vorurteilen und Diskriminierung.",
                    type2Perspective: "Teilt diese Erfahrung und die Resilienz-Strategien.",
                    dynamic: "Gemeinsame Stärke gegen gesellschaftlichen Druck."
                }
            }
        },
        // Duo × Duo (hohe Kompatibilität - Test)
        "duo-duo": {
            "A": {
                "exklusivitaets-erwartung": {
                    type1Perspective: "Exklusivität als fundamentaler Ausdruck von Liebe.",
                    type2Perspective: "Teilt dieses Verständnis von Exklusivität vollständig.",
                    dynamic: "Perfekte Übereinstimmung: Beide verstehen und wünschen Exklusivität."
                },
                "offenheit-fuer-alternative-modelle": {
                    type1Perspective: "Bevorzugt das klassische Zweiermodell.",
                    type2Perspective: "Gleiche Präferenz für monogame Partnerschaft.",
                    dynamic: "Geteilte Wertschätzung für traditionelles Beziehungsmodell."
                },
                "beziehung-als-lebensinhalt-vs-lebensbereich": {
                    type1Perspective: "Die Partnerschaft ist zentraler Lebensinhalt.",
                    type2Perspective: "Teilt diese Priorisierung der Beziehung.",
                    dynamic: "Gemeinsames 'Wir' als Lebensmittelpunkt - perfekte Synergie."
                }
            },
            "B": {
                "definition-von-treue": {
                    type1Perspective: "Treue = exklusive emotionale und sexuelle Bindung.",
                    type2Perspective: "Gleiche Definition, gleiche Erwartung.",
                    dynamic: "Keine Definitions-Konflikte bei diesem zentralen Thema."
                },
                "ethische-grundhaltung": {
                    type1Perspective: "Ethik basiert auf Versprechen und Verbindlichkeit.",
                    type2Perspective: "Teilt diese ethischen Grundwerte.",
                    dynamic: "Gemeinsame ethische Basis für eine stabile Partnerschaft."
                },
                "verantwortungsbewusstsein": {
                    type1Perspective: "Fokussierte Verantwortung füreinander.",
                    type2Perspective: "Gleiche Verantwortungsbereitschaft.",
                    dynamic: "Gegenseitige, konzentrierte Verantwortung - klare Struktur."
                }
            },
            "C": {
                "emotionale-verschmelzungs-tendenz": {
                    type1Perspective: "Wünscht tiefe emotionale Verschmelzung.",
                    type2Perspective: "Teilt dieses Bedürfnis nach Nähe und Verbundenheit.",
                    dynamic: "Beidseitiges Streben nach emotionaler Tiefe."
                },
                "physische-naehe-beduerfnisse": {
                    type1Perspective: "Physische Nähe exklusiv mit dem Partner.",
                    type2Perspective: "Gleiche Exklusivitäts-Erwartung bei Intimität.",
                    dynamic: "Keine Konkurrenz um Nähe - ungeteilte Aufmerksamkeit."
                },
                "faehigkeit-raum-zu-geben": {
                    type1Perspective: "Raum innerhalb der Partnerschaft.",
                    type2Perspective: "Gleiche Balance zwischen Nähe und individuellem Raum.",
                    dynamic: "Ähnliche Raum-Bedürfnisse erleichtern das Zusammenleben."
                }
            },
            "D": {
                "individuelle-freiheit": {
                    type1Perspective: "Freiheit wird gemeinsam als Paar definiert.",
                    type2Perspective: "Teilt dieses Verständnis von Paar-Freiheit.",
                    dynamic: "Gemeinsame Freiheits-Definition als 'Wir'."
                },
                "entscheidungsautonomie": {
                    type1Perspective: "Wichtige Entscheidungen gemeinsam treffen.",
                    type2Perspective: "Gleiche Erwartung an gemeinsame Entscheidungsfindung.",
                    dynamic: "Geteilte Entscheidungsmacht ohne Autonomie-Konflikte."
                },
                "akzeptanz-der-autonomie-des-anderen": {
                    type1Perspective: "Autonomie innerhalb des Paar-Rahmens.",
                    type2Perspective: "Gleiche Balance zwischen Individualität und Partnerschaft.",
                    dynamic: "Ähnliche Autonomie-Grenzen erleichtern das Zusammenleben."
                }
            },
            "E": {
                "kommunikationstiefe": {
                    type1Perspective: "Tiefe Kommunikation zu zweit.",
                    type2Perspective: "Gleicher Wunsch nach intensivem Austausch.",
                    dynamic: "Fokussierte, tiefe Kommunikation ohne Verteilung."
                },
                "konfliktfaehigkeit": {
                    type1Perspective: "Konflikte werden zu zweit gelöst.",
                    type2Perspective: "Gleiche Erwartung an bilaterale Konfliktlösung.",
                    dynamic: "Klare Konflikt-Struktur ohne externe Komplexität."
                },
                "emotionale-transparenz": {
                    type1Perspective: "Volle Transparenz gegenüber dem Partner.",
                    type2Perspective: "Gleiche Transparenz-Erwartung und -Bereitschaft.",
                    dynamic: "Gegenseitige Offenheit ohne konkurrierende Loyalitäten."
                }
            },
            "F": {
                "gesellschaftliche-akzeptanz": {
                    type1Perspective: "Volle gesellschaftliche Akzeptanz.",
                    type2Perspective: "Teilt diese privilegierte Position.",
                    dynamic: "Keine externen Hürden durch gesellschaftliche Normen."
                },
                "integration-in-soziale-kreise": {
                    type1Perspective: "Als Paar problemlos integriert.",
                    type2Perspective: "Gleiche einfache soziale Integration.",
                    dynamic: "Gesellschaftliche Normalität als gemeinsame Basis."
                },
                "umgang-mit-stigma": {
                    type1Perspective: "Kein Stigma, sondern gesellschaftliche Unterstützung.",
                    type2Perspective: "Teilt diese Stigma-freie Erfahrung.",
                    dynamic: "Kein externer Druck - Fokus auf die Beziehung selbst."
                }
            }
        }
    };

    // Helper function to normalize tag names for lookup
    function normalizeTagName(tag) {
        return tag.toLowerCase()
            .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    return {
        tagTooltipContent: tagTooltipContent,
        normalizeTagName: normalizeTagName
    };
})();

if (typeof window !== 'undefined') {
    window.TiageTagTooltips = TiageTagTooltips;
}
