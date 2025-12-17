/**
 * BEDÜRFNIS-KATALOG LOADER v3.0.0
 *
 * Lädt beduerfnis-katalog.json und macht ihn als window.BeduerfnisKatalog verfügbar.
 * Stellt sicher, dass die frageTyp-Felder (haupt/nuance) und andere Metadaten
 * der konsolidierten Bedürfnisse v3.0.0 verfügbar sind.
 */

(function() {
    'use strict';

    // Laden des Katalogs via fetch
    const katalogPath = 'profiles/data/beduerfnis-katalog.json';

    fetch(katalogPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(katalog => {
            // Expose global
            window.BeduerfnisKatalog = katalog;

            // Update BeduerfnisIds.beduerfnisse mit frageTyp aus Katalog
            if (typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.beduerfnisse && katalog.beduerfnisse) {
                Object.keys(katalog.beduerfnisse).forEach(id => {
                    const katalogNeed = katalog.beduerfnisse[id];
                    const idsNeed = BeduerfnisIds.beduerfnisse[id];

                    if (idsNeed && katalogNeed) {
                        // Füge frageTyp, nuancen, hauptbeduerfnis hinzu
                        idsNeed.frageTyp = katalogNeed.frageTyp;
                        idsNeed.frage = katalogNeed.frage;

                        if (katalogNeed.nuancen) {
                            idsNeed.nuancen = katalogNeed.nuancen;
                        }
                        if (katalogNeed.hauptbeduerfnis) {
                            idsNeed.hauptbeduerfnis = katalogNeed.hauptbeduerfnis;
                        }
                        if (katalogNeed.kontext) {
                            idsNeed.kontext = katalogNeed.kontext;
                        }
                    }
                });

                console.log('[BeduerfnisKatalog] v' + katalog.version + ' geladen - ' +
                            Object.keys(katalog.beduerfnisse).length + ' Bedürfnisse');

                // Count haupt vs nuance
                let hauptCount = 0;
                let nuanceCount = 0;
                Object.values(katalog.beduerfnisse).forEach(need => {
                    if (need.frageTyp === 'haupt') hauptCount++;
                    else if (need.frageTyp === 'nuance') nuanceCount++;
                });
                console.log('[BeduerfnisKatalog] ' + hauptCount + ' Hauptfragen, ' +
                            nuanceCount + ' Nuancen');
            }

            // Dispatch event für Code der auf den Katalog wartet
            document.dispatchEvent(new CustomEvent('beduerfnisKatalogLoaded', {
                detail: { version: katalog.version, katalog: katalog }
            }));
        })
        .catch(error => {
            console.error('[BeduerfnisKatalog] Fehler beim Laden:', error);
        });
})();
