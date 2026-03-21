/**
 * categoryDetailsModal.js — Category Details & SubDimension Info Modals
 * Extracted from app-main.js v1.8.1027
 *
 * Dependencies (via window.*):
 *   window.getIchArchetype()              – current ICH archetype
 *   window.getPartnerArchetype()          – current PARTNER archetype
 *   window.tiageData                      – tiage data (categories, archetypes, interactions)
 *   window.navigateArchetype()            – archetype navigation (app-main.js)
 *   window.updateComparisonView()         – desktop view update (app-main.js)
 *   window.TiageStatementHelpers          – statement helper functions
 *   TiageI18n                             – internationalization
 */
(function() {
    'use strict';

let currentDisplayedCategory = 'A';

// Navigation für CategoryModal - wechselt beide Archetypen (ICH)
function navigateCategoryArchetype(direction) {
    window.navigateArchetype('ich', direction);
    // CategoryModal neu laden mit aktueller Kategorie
    showCategoryDetails(currentDisplayedCategory);
    // Alle Ansichten aktualisieren
    window.updateComparisonView();
}

function showCategoryDetails(cat) {
    if (!window.tiageData || !window.tiageData.categories || !window.tiageData.categories[cat]) return;

    // Aktuelle Kategorie speichern für Navigation
    currentDisplayedCategory = cat;

    const catInfo = window.tiageData.categories[cat];
    const catNames = {
        A: 'Beziehungsphilosophie',
        B: 'Werte-Alignment',
        C: 'Nähe-Distanz',
        D: 'Autonomie',
        E: 'Kommunikation',
        F: 'Soziale Kompatibilität'
    };

    const ichArch = window.tiageData.archetypes[window.getIchArchetype()];
    const partnerArch = window.tiageData.archetypes[window.getPartnerArchetype()];
    const key = `${window.getIchArchetype()}_${window.getPartnerArchetype()}`;
    const interaction = window.tiageData.interactions?.[key] || {};
    const catScore = interaction.scores?.[cat]?.value || 0;

    let scoreClass = 'low';
    let scoreText = 'Herausfordernd';
    if (catScore >= 70) { scoreClass = 'good'; scoreText = 'Gut'; }
    else if (catScore >= 50) { scoreClass = 'moderate'; scoreText = 'Mittel'; }

    let modalContent = `
        <div class="modal-category">
            <div style="background: rgba(69,123,157,0.1); padding: 12px; border-radius: 10px; margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="color: var(--text-secondary); font-size: 12px;">Aktuelle Kombination</span>
                    <span style="font-size: 18px; font-weight: 700; color: var(--${scoreClass === 'good' ? 'primary' : scoreClass === 'moderate' ? 'warning' : 'danger'});">${catScore}%</span>
                </div>
                <div style="font-size: 14px; font-weight: 600; color: var(--text-primary);">
                    <span style="color: #2ecc71;">${ichArch?.name || window.getIchArchetype()}</span>
                    <span style="color: var(--text-muted);"> × </span>
                    <span style="color: #e74c3c;">${partnerArch?.name || window.getPartnerArchetype()}</span>
                </div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${scoreText} in dieser Kategorie</div>
            </div>

            <div class="modal-category-header">
                <div class="modal-category-letter">${cat}</div>
                <div class="modal-category-name">${catNames[cat]}</div>
            </div>
            <div class="modal-category-desc">${catInfo.description || TiageI18n.t('ui.noDescription', 'Keine Beschreibung verfügbar.')}</div>
    `;

    if (catInfo.subDimensions && catInfo.subDimensions.length > 0) {
        modalContent += `
            <div class="definition-section">
                <div class="definition-section-title">Subdimensionen <span style="font-size: 10px; color: var(--text-muted);">(klicken für Details)</span></div>
                <ul class="definition-list variants clickable-subs">
                    ${catInfo.subDimensions.map(sub => `<li onclick="showSubDimensionInfo('${cat}', '${sub.replace(/'/g, "\\'")}')" style="cursor: pointer; padding: 8px; border-radius: 6px; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">${sub} <span style="color: var(--text-muted); font-size: 10px;">→</span></li>`).join('')}
                </ul>
            </div>
        `;
    }

    modalContent += '</div>';

    document.getElementById('modalTitle').textContent = `Qualitätsmuster ${cat}: ${catNames[cat]}`;
    document.getElementById('modalBody').innerHTML = modalContent;
    document.getElementById('categoryModal').classList.add('active');
}

const subDimensionData = {
    "Exklusivitäts-Erwartung": {
        was: "Die Erwartung, der einzige romantische/sexuelle Partner zu sein.",
        warum: "Diese Dimension ist fundamental, weil unterschiedliche Erwartungen zu Enttäuschung, Eifersucht und Vertrauensbrüchen führen können.",
        wozu: "Klare Erwartungen verhindern Missverständnisse und schaffen eine gemeinsame Basis für die Beziehungsgestaltung.",
        archetypen: {
            single: "Flexibel - keine feste Erwartung, offen für verschiedene Modelle",
            duo: "Hohe Erwartung an vollständige Exklusivität",
            duo_flex: "Grundsätzlich exklusiv, aber mit Ausnahmen nach Absprache",
            solopoly: "Keine Exklusivitätserwartung - jede Beziehung ist eigenständig",
            polyamor: "Bewusste Nicht-Exklusivität mit klaren Strukturen",
            ra: "Keine normativen Exklusivitätserwartungen - alles verhandelbar",
            lat: "Flexibel - Exklusivität ist unabhängig von Wohnsituation",
            aromantisch: "Romantische Exklusivität nicht relevant - andere Verbindungen zählen"
        }
    },
    "Offenheit für alternative Modelle": {
        was: "Die Bereitschaft, nicht-traditionelle Beziehungsformen zu akzeptieren oder auszuprobieren.",
        warum: "Unterschiedliche Offenheit kann zu Konflikten führen, wenn ein Partner expandieren möchte und der andere nicht.",
        wozu: "Gemeinsame Offenheit ermöglicht Wachstum und Anpassung der Beziehung an veränderte Bedürfnisse.",
        archetypen: {
            single: "Oft sehr offen - keine festgelegte Struktur",
            duo: "Tendenziell geschlossen - Monogamie als Ideal",
            duo_flex: "Moderat offen - bereit für situative Anpassungen",
            solopoly: "Sehr offen - lebt bereits alternatives Modell",
            polyamor: "Strukturiert offen - klare Rahmen für Vielfalt",
            ra: "Maximal offen - alle Normen werden hinterfragt",
            lat: "Moderat offen - alternative Wohnform wird bereits gelebt",
            aromantisch: "Offen für alternative Beziehungsformen - Romantik ist nicht zentral"
        }
    },
    "Beziehung als Lebensinhalt vs. Lebensbereich": {
        was: "Wie zentral ist die Beziehung im Leben? Ist sie alles oder ein Teil von vielem?",
        warum: "Wenn einer die Beziehung als Lebensmittelpunkt sieht und der andere als Nebensache, entstehen ungleiche Investitionen.",
        wozu: "Ähnliche Priorisierung schafft Balance und verhindert das Gefühl von Vernachlässigung oder Überforderung.",
        archetypen: {
            single: "Lebensbereich - das eigene Leben steht im Zentrum",
            duo: "Oft Lebensinhalt - die Beziehung ist sehr wichtig",
            duo_flex: "Wichtiger Lebensbereich mit hoher Priorität",
            solopoly: "Klar Lebensbereich - das Selbst bleibt Zentrum",
            polyamor: "Wichtiger Lebensbereich - aber mit mehreren Beziehungen",
            ra: "Lebensbereich - Autonomie und Selbstbestimmung zentral",
            lat: "Wichtiger Lebensbereich - aber eigener Raum ist essentiell",
            aromantisch: "Lebensbereich - Freundschaften und andere Verbindungen zentral"
        }
    },
    "Definition von Treue": {
        was: "Was bedeutet 'treu sein' konkret? Körperliche Exklusivität, emotionale Treue, oder Ehrlichkeit?",
        warum: "Unterschiedliche Definitionen führen oft zu den schmerzhaftesten Missverständnissen in Beziehungen.",
        wozu: "Eine gemeinsame Definition von Treue schafft Klarheit und Vertrauen - unabhängig davon, wie sie aussieht.",
        archetypen: {
            single: "Flexibel - Treue ist kontextabhängig",
            duo: "Klassisch - körperliche UND emotionale Exklusivität",
            duo_flex: "Angepasst - emotionale Treue wichtiger als körperliche",
            solopoly: "Neu definiert - Treue = Ehrlichkeit und Transparenz",
            polyamor: "Strukturiert - Treue zu vereinbarten Regeln und Grenzen",
            ra: "Individuell definiert - Treue ist nicht normativ vorgegeben",
            lat: "Emotionale Treue wichtig - unabhängig von Wohnsituation",
            aromantisch: "Treue zu Absprachen - romantische Treue nicht relevant"
        }
    },
    "Ethische Grundhaltung": {
        was: "Die gemeinsamen Werte wie Ehrlichkeit, Respekt, Consent und Fairness.",
        warum: "Unterschiedliche ethische Grundhaltungen untergraben das Fundament jeder Beziehung und führen zu Vertrauensverlust.",
        wozu: "Geteilte ethische Werte schaffen ein sicheres Fundament für alle anderen Aspekte der Beziehung.",
        archetypen: {
            single: "Individuell geprägt - eigene ethische Standards",
            duo: "Traditionell - gesellschaftliche Normen als Leitfaden",
            duo_flex: "Reflektiert - bewusste Auseinandersetzung mit Normen",
            solopoly: "Progressiv - aktive ethische Reflexion",
            polyamor: "Strukturiert ethisch - klare Regeln für fairen Umgang",
            ra: "Anarchisch-ethisch - Normen werden radikal hinterfragt",
            lat: "Autonom-ethisch - Respekt vor individuellem Raum",
            aromantisch: "Authentisch - Ehrlichkeit über eigene Grenzen"
        }
    },
    "Verantwortungsbewusstsein": {
        was: "Die Bereitschaft, Verantwortung für eigene Handlungen und deren Auswirkungen zu übernehmen.",
        warum: "Ohne Verantwortungsbewusstsein werden Fehler wiederholt und Partner verletzt.",
        wozu: "Verantwortung ermöglicht Wachstum, Reparatur nach Konflikten und nachhaltige Beziehungsqualität.",
        archetypen: {
            single: "Primär für sich selbst verantwortlich",
            duo: "Hohe gegenseitige Verantwortung erwartet",
            duo_flex: "Balancierte Verantwortung mit Flexibilität",
            solopoly: "Selbstverantwortung betont, aber fair zu Partnern",
            polyamor: "Komplexe Verantwortung für mehrere Beziehungen",
            ra: "Hohe Selbstverantwortung - keine normativen Erwartungen",
            lat: "Verantwortung für Beziehungsqualität trotz Distanz",
            aromantisch: "Verantwortung für klare Kommunikation der Grenzen"
        }
    },
    "Emotionale Verschmelzungs-Tendenz": {
        was: "Das Bedürfnis, emotional mit dem Partner zu verschmelzen - von 'wir sind eins' bis 'wir sind zwei'.",
        warum: "Starke Unterschiede führen dazu, dass einer sich eingeengt und der andere sich abgelehnt fühlt.",
        wozu: "Ähnliche Verschmelzungs-Präferenzen ermöglichen eine Nähe, die sich für beide richtig anfühlt.",
        archetypen: {
            single: "Niedrig - Autonomie steht vor Verschmelzung",
            duo: "Oft hoch - 'Wir' als zentrale Identität",
            duo_flex: "Moderat - Nähe mit Grenzen",
            solopoly: "Niedrig - bewusste Distanz zu Verschmelzung",
            polyamor: "Differenziert - unterschiedlich mit verschiedenen Partnern",
            ra: "Niedrig - Autonomie ist zentraler Wert",
            lat: "Moderat - emotionale Nähe ohne räumliche Verschmelzung",
            aromantisch: "Niedrig - romantische Verschmelzung nicht gewünscht"
        }
    },
    "Physische Nähe-Bedürfnisse": {
        was: "Wie viel körperliche Präsenz und Nähe braucht man? Zusammenleben, täglicher Kontakt, wöchentlich?",
        warum: "Mismatches führen zu Einsamkeit (bei zu wenig) oder Erstickung (bei zu viel).",
        wozu: "Abgestimmte Nähe-Bedürfnisse ermöglichen, dass beide sich gesehen und respektiert fühlen.",
        archetypen: {
            single: "Flexibel - kein konstantes Nähe-Bedürfnis",
            duo: "Hoch - oft Wunsch nach Zusammenleben",
            duo_flex: "Moderat bis hoch mit Freiraum-Phasen",
            solopoly: "Bewusst niedrig - eigener Wohnraum wichtig",
            polyamor: "Komplex - unterschiedliche Nähe mit verschiedenen Partnern",
            ra: "Individuell verhandelbar - keine normativen Erwartungen",
            lat: "Bewusst niedrig - getrennte Wohnungen als Prinzip",
            aromantisch: "Variabel - nicht an romantische Nähe gebunden"
        }
    },
    "Fähigkeit, Raum zu geben": {
        was: "Die Fähigkeit, dem Partner Freiraum zu lassen ohne sich vernachlässigt oder unsicher zu fühlen.",
        warum: "Ohne diese Fähigkeit entstehen Kontrolle, Eifersucht und Erstickung der Beziehung.",
        wozu: "Raum geben können ermöglicht individuelle Entwicklung innerhalb der Beziehung.",
        archetypen: {
            single: "Hoch - Raum ist selbstverständlich",
            duo: "Muss oft gelernt werden - Nähe ist Standard",
            duo_flex: "Bewusst entwickelt - wichtig für das Modell",
            solopoly: "Sehr hoch - Teil der Grundphilosophie",
            polyamor: "Essentiell - strukturell eingebaut",
            ra: "Maximal - Autonomie als höchster Wert",
            lat: "Sehr hoch - räumlicher Freiraum ist zentral",
            aromantisch: "Hoch - respektiert nicht-romantische Grenzen"
        }
    },
    "Individuelle Freiheit": {
        was: "Der Wert, den man persönlicher Freiheit in der Beziehung beimisst - eigene Entscheidungen, Hobbies, Freunde.",
        warum: "Unterschiedliche Freiheitsbedürfnisse führen zu Machtkämpfen oder Entfremdung.",
        wozu: "Respektierte Freiheit ermöglicht authentisches Selbst und verhindert Resentment.",
        archetypen: {
            single: "Maximale Freiheit - das Kernbedürfnis",
            duo: "Eingeschränkt - Kompromisse erwartet",
            duo_flex: "Balanciert - Freiheit mit Rücksichtnahme",
            solopoly: "Maximal - Autonomie ist nicht verhandelbar",
            polyamor: "Hoch - aber mit Verantwortung verbunden",
            ra: "Maximal - Freiheit von allen Normen",
            lat: "Hoch - räumliche Autonomie garantiert Freiheit",
            aromantisch: "Hoch - Freiheit von romantischen Erwartungen"
        }
    },
    "Entscheidungsautonomie": {
        was: "Wer entscheidet was? Wie viel Mitsprache hat der Partner bei persönlichen Entscheidungen?",
        warum: "Konflikte entstehen, wenn einer Kontrolle erwartet und der andere Autonomie braucht.",
        wozu: "Klare Entscheidungsstrukturen verhindern Machtkämpfe und schaffen Klarheit.",
        archetypen: {
            single: "Vollständig - alle Entscheidungen selbst",
            duo: "Oft geteilt - wichtige Dinge gemeinsam",
            duo_flex: "Hybrid - manche gemeinsam, manche allein",
            solopoly: "Hoch - Autonomie auch in der Beziehung",
            polyamor: "Komplex - unterschiedlich je nach Beziehung",
            ra: "Maximal - keine externen Vorgaben akzeptiert",
            lat: "Hoch - eigene Entscheidungen im eigenen Raum",
            aromantisch: "Hoch - Entscheidungen nicht an romantischen Normen orientiert"
        }
    },
    "Akzeptanz der Autonomie des anderen": {
        was: "Die Fähigkeit zu akzeptieren, dass der Partner eigene Entscheidungen trifft - auch wenn man nicht zustimmt.",
        warum: "Fehlende Akzeptanz führt zu Kontrolle, Manipulation und Vertrauensverlust.",
        wozu: "Akzeptanz ermöglicht echte Partnerschaft statt Abhängigkeit.",
        archetypen: {
            single: "Hoch - Autonomie wird geschätzt",
            duo: "Muss oft gelernt werden",
            duo_flex: "Bewusst entwickelt",
            solopoly: "Sehr hoch - zentral für das Modell",
            polyamor: "Essentiell - ohne geht es nicht",
            ra: "Maximal - Grundprinzip der Beziehungsphilosophie",
            lat: "Hoch - respektiert räumliche Autonomie des anderen",
            aromantisch: "Hoch - akzeptiert nicht-romantische Bedürfnisse"
        }
    },
    "Kommunikationstiefe": {
        was: "Wie tief gehen Gespräche? Von Alltag bis zu Ängsten, Träumen und Verletzlichkeit.",
        warum: "Unterschiedliche Tiefen-Präferenzen führen zu Frustration - einer will mehr, einer weniger.",
        wozu: "Passende Kommunikationstiefe schafft echte Verbindung und Verständnis.",
        archetypen: {
            single: "Variabel - je nach Beziehung",
            duo: "Oft hoch - alles teilen als Ideal",
            duo_flex: "Selektiv tief - wichtiges wird geteilt",
            solopoly: "Bewusst tief - Kommunikation ist essentiell",
            polyamor: "Hoch - Komplexität erfordert Kommunikation",
            ra: "Individuell - keine normativen Erwartungen an Tiefe",
            lat: "Qualitätsfokussiert - tiefe Gespräche in begrenzter Zeit",
            aromantisch: "Authentisch - tiefe Verbindung ohne romantische Komponente"
        }
    },
    "Konfliktfähigkeit": {
        was: "Wie geht man mit Konflikten um? Vermeidung, Eskalation, konstruktive Lösung?",
        warum: "Unterschiedliche Stile führen dazu, dass Konflikte ungelöst bleiben oder eskalieren.",
        wozu: "Kompatible Konfliktfähigkeit ermöglicht Wachstum durch Krisen statt Zerstörung.",
        archetypen: {
            single: "Kann Konflikte vermeiden durch Distanz",
            duo: "Muss Konflikte lösen - kein Entkommen",
            duo_flex: "Flexibel - manchmal Distanz, manchmal Lösung",
            solopoly: "Klar - bei Unlösbarkeit kann man gehen",
            polyamor: "Entwickelt - Kommunikation als Lösung",
            ra: "Individuell - keine externen Konfliktlösungsmodelle",
            lat: "Distanz möglich - räumliche Trennung als Puffer",
            aromantisch: "Sachlich - nicht-romantische Konfliktlösung"
        }
    },
    "Emotionale Transparenz": {
        was: "Wie offen teilt man Gefühle? Alles aussprechen oder manches für sich behalten?",
        warum: "Unterschiede führen zu Missverständnissen - einer fühlt sich verschlossen, der andere überfordert.",
        wozu: "Abgestimmte Transparenz schafft Vertrauen ohne Überforderung.",
        archetypen: {
            single: "Selektiv - teilt was nötig ist",
            duo: "Oft hohe Erwartung an Transparenz",
            duo_flex: "Balanciert - wichtiges wird geteilt",
            solopoly: "Hoch - Ehrlichkeit ist zentral",
            polyamor: "Sehr hoch - Basis des Modells",
            ra: "Individuell - keine normativen Transparenz-Erwartungen",
            lat: "Qualitativ - tiefe Gespräche in begrenzter Zeit",
            aromantisch: "Ehrlich - klar über eigene Grenzen"
        }
    },
    "Gesellschaftliche Akzeptanz": {
        was: "Wie wichtig ist es, dass Familie, Freunde und Gesellschaft die Beziehung akzeptieren?",
        warum: "Unterschiedliche Wichtigkeit führt zu Konflikten über 'Outing' und öffentliches Auftreten.",
        wozu: "Ähnliche Wichtigkeit ermöglicht einen gemeinsamen Umgang mit dem sozialen Umfeld.",
        archetypen: {
            single: "Unkompliziert - gesellschaftlich akzeptiert",
            duo: "Sehr wichtig - passt zur Norm",
            duo_flex: "Moderat - gewisse Erklärungen nötig",
            solopoly: "Weniger wichtig - lebt gegen die Norm",
            polyamor: "Komplex - manche Offenheit, manche Diskretion",
            ra: "Unwichtig - gesellschaftliche Normen werden abgelehnt",
            lat: "Erklärungsbedürftig - 'Warum wohnt ihr nicht zusammen?'",
            aromantisch: "Herausfordernd - romantische Norm ist tief verankert"
        }
    },
    "Integration in soziale Kreise": {
        was: "Wie wird die Beziehung in Freundeskreis, Familie und Arbeit integriert und präsentiert?",
        warum: "Unterschiede führen zu Frustration - einer will präsentieren, der andere verstecken.",
        wozu: "Gemeinsame Strategien für soziale Integration schaffen ein einheitliches Auftreten.",
        archetypen: {
            single: "Einfach - keine komplexe Integration nötig",
            duo: "Vollständig - Partner wird überall eingeführt",
            duo_flex: "Weitgehend - mit gewissen Grenzen",
            solopoly: "Selektiv - nicht überall erklärbar",
            polyamor: "Komplex - unterschiedlich je nach Umfeld",
            ra: "Individuell - Integration nach eigenen Regeln",
            lat: "Erklärungsbedürftig - getrennte Wohnungen irritieren",
            aromantisch: "Herausfordernd - 'Nur Freunde?' wird oft missverstanden"
        }
    },
    "Umgang mit Stigma": {
        was: "Wie geht man mit negativen Reaktionen auf die Beziehungsform um? Erklären, ignorieren, kämpfen?",
        warum: "Unterschiedliche Strategien führen zu Konflikten darüber, wie man als Paar auftritt.",
        wozu: "Gemeinsame Strategie stärkt die Beziehung gegen äußeren Druck.",
        archetypen: {
            single: "Kaum Stigma - gesellschaftlich normal",
            duo: "Kein Stigma - das Ideal der Gesellschaft",
            duo_flex: "Leichtes Stigma - 'offene Beziehung'",
            solopoly: "Erhebliches Stigma - schwer erklärbar",
            polyamor: "Stigma vorhanden - aber zunehmend bekannt",
            ra: "Hohes Stigma - radikale Position wird missverstanden",
            lat: "Moderates Stigma - 'echte' Beziehung in Frage gestellt",
            aromantisch: "Hohes Stigma - wird als Defizit wahrgenommen"
        }
    }
};

function showSubDimensionInfo(cat, subName) {
    const subData = subDimensionData[subName] || { was: TiageI18n.t('ui.noDescription', 'Keine Beschreibung verfügbar.'), warum: "", wozu: "", archetypen: {} };
    const catNames = {
        A: 'Beziehungsphilosophie',
        B: 'Werte-Alignment',
        C: 'Nähe-Distanz',
        D: 'Autonomie',
        E: 'Kommunikation',
        F: 'Soziale Kompatibilität'
    };

    const ichArch = window.tiageData?.archetypes?.[window.getIchArchetype()];
    const partnerArch = window.tiageData?.archetypes?.[window.getPartnerArchetype()];
    const ichId = window.getIchArchetype();
    const partnerId = window.getPartnerArchetype();

    const ichPerspektive = subData.archetypen?.[ichId] || TiageI18n.t('ui.noData', 'Keine Daten');
    const partnerPerspektive = subData.archetypen?.[partnerId] || TiageI18n.t('ui.noData', 'Keine Daten');

    let modalContent = `
        <div style="background: rgba(69,123,157,0.1); padding: 12px; border-radius: 10px; margin-bottom: 15px;">
            <div style="font-size: 11px; color: var(--text-muted);">Teil von Qualitätsmuster ${cat}: ${catNames[cat]}</div>
        </div>

        <div style="margin-bottom: 15px;">
            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">WAS?</div>
            <p style="color: var(--text-primary); line-height: 1.5;">${subData.was}</p>
        </div>

        <div style="margin-bottom: 15px;">
            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">WARUM WICHTIG?</div>
            <p style="color: var(--text-secondary); line-height: 1.5;">${subData.warum}</p>
        </div>

        <div style="margin-bottom: 20px;">
            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">WOZU?</div>
            <p style="color: var(--text-secondary); line-height: 1.5;">${subData.wozu}</p>
        </div>

        <div style="background: rgba(46,204,113,0.1); padding: 12px; border-radius: 10px; margin-bottom: 10px;">
            <div style="font-size: 12px; color: #2ecc71; font-weight: 600; margin-bottom: 8px;">ICH (${ichArch?.name || ichId}):</div>
            <p style="color: var(--text-secondary); font-size: 12px; line-height: 1.5;">${ichPerspektive}</p>
        </div>

        <div style="background: rgba(231,76,60,0.1); padding: 12px; border-radius: 10px; margin-bottom: 15px;">
            <div style="font-size: 12px; color: #e74c3c; font-weight: 600; margin-bottom: 8px;">PARTNER (${partnerArch?.name || partnerId}):</div>
            <p style="color: var(--text-secondary); font-size: 12px; line-height: 1.5;">${partnerPerspektive}</p>
        </div>

        <div style="background: rgba(108, 117, 125, 0.1); padding: 12px; border-radius: 10px;">
            <div style="font-size: 12px; color: #6c757d; font-weight: 600; margin-bottom: 8px;">BEDEUTUNG FÜR EURE KOMBINATION:</div>
            <p style="color: var(--text-secondary); font-size: 12px; line-height: 1.5;">${generateCombinationAnalysis(ichId, partnerId, subName, subData)}</p>
        </div>
    `;

    document.getElementById('modalTitle').textContent = subName;
    document.getElementById('modalBody').innerHTML = modalContent;
}

function generateCombinationAnalysis(ichId, partnerId, subName, subData) {
    if (ichId === partnerId) {
        return `Da ihr beide denselben Archetyp habt, solltet ihr hier ähnliche Vorstellungen haben. Das reduziert Konfliktpotential in dieser Dimension erheblich.`;
    }

    const polyTypes = ['solopoly', 'polyamor', 'ra'];
    const monoTypes = ['single', 'duo', 'duo_flex', 'lat', 'aromantisch'];
    const ichIsPoly = polyTypes.includes(ichId);
    const partnerIsPoly = polyTypes.includes(partnerId);

    if (ichIsPoly !== partnerIsPoly) {
        return `Hier treffen fundamental unterschiedliche Weltanschauungen aufeinander. Ein Poly-Typ und ein Mono-Typ haben oft gegensätzliche Perspektiven auf "${subName}". Intensive Kommunikation und gegenseitiges Verständnis sind essentiell.`;
    }

    if (ichIsPoly && partnerIsPoly) {
        return `Als zwei Poly-Typen teilt ihr grundsätzlich ähnliche Werte in dieser Dimension. Die Unterschiede liegen eher in der konkreten Ausgestaltung als in den Grundprinzipien.`;
    }

    return `Eure Archetypen haben unterschiedliche Schwerpunkte in dieser Dimension. Offene Gespräche darüber, was euch beiden wichtig ist, helfen, gemeinsame Lösungen zu finden.`;
}

// NEU: Generiere dynamische Pro/Contra aus Micro-Statements
function generateDynamicProContra(type1, type2, dims1, dims2) {
    const pro = [];
    const contra = [];

    // 1. Archetyp-basierte Pro/Contra
    const archStatements = window.TiageStatementHelpers.getArchetypeStatements(type1, type2);
    if (archStatements) {
        pro.push(...(archStatements.pro || []));
        contra.push(...(archStatements.contra || []));
    }

    // 2. Dominanz-basierte Pro/Contra hinzufügen
    const domStatements = window.TiageStatementHelpers.getDominanceStatements(dims1?.dominanz, dims2?.dominanz);
    if (domStatements && domStatements.pro) {
        // Füge nur die relevantesten hinzu, um Doppelungen zu vermeiden
        domStatements.pro.slice(0, 2).forEach(p => {
            if (!pro.includes(p)) pro.push(p);
        });
    }
    if (domStatements && domStatements.contra) {
        domStatements.contra.slice(0, 2).forEach(c => {
            if (!contra.includes(c)) contra.push(c);
        });
    }

    return { pro, contra };
}

    // ── Exports ─────────────────────────────────────────────────────────────
    window.navigateCategoryArchetype = navigateCategoryArchetype;
    window.showCategoryDetails = showCategoryDetails;
    window.showSubDimensionInfo = showSubDimensionInfo;
    window.generateDynamicProContra = generateDynamicProContra;

})();
