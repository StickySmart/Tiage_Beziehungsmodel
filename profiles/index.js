/**
 * PROFILES INDEX v1.0
 *
 * Zentraler Einstiegspunkt für das Profile-System.
 * Re-exportiert alle Module für einfachen Zugriff.
 *
 * Struktur:
 * profiles/
 * ├── definitions/          # Kern-Definitionen
 * │   ├── taxonomie.js          # SSOT: #P, #D, #K Hierarchie
 * │   ├── beduerfnis-ids.js     # #ID-System (#B1-#B220)
 * │   ├── gfk-beduerfnisse.js   # GFK-Bedürfnisse
 * │   ├── archetyp-definitions.js
 * │   └── dominance-definitions.js
 * ├── data/                 # Strukturierte Daten (JSON)
 * │   ├── beduerfnis-katalog.json
 * │   └── beduerfnis-sources.json
 * ├── docs/                 # Dokumentation & Forschung
 * │   ├── alle-220-beduerfnisse-fragen.md
 * │   └── *.md
 * ├── archetypen/           # 8 Archetyp-Definitionen
 * ├── modifiers/            # Demografische Modifikatoren
 * ├── beduerfnis-modifikatoren.js  # Modifikator-System
 * └── profile-store.js      # Haupt-Orchestrator
 */

(function() {
    'use strict';

    // Zentrales Profile-Objekt
    const TiageProfiles = {
        version: '1.0.0',

        // Referenzen zu den Modulen (werden nach dem Laden gesetzt)
        BeduerfnisIds: null,
        BeduerfnisModifikatoren: null,
        ArchetypProfileLoader: null,
        LoadedArchetypProfile: null,
        ProfileStore: null,

        /**
         * Initialisiert das Profile-System
         * Sollte nach dem Laden aller Scripts aufgerufen werden
         */
        init: function() {
            // Referenzen setzen
            this.BeduerfnisIds = window.BeduerfnisIds || null;
            this.BeduerfnisModifikatoren = window.BeduerfnisModifikatoren || null;
            this.ArchetypProfileLoader = window.ArchetypProfileLoader || null;
            this.LoadedArchetypProfile = window.LoadedArchetypProfile || null;
            this.ProfileStore = window.ProfileStore || null;

            // Status ausgeben
            const status = {
                BeduerfnisIds: !!this.BeduerfnisIds,
                BeduerfnisModifikatoren: !!this.BeduerfnisModifikatoren,
                ArchetypProfileLoader: !!this.ArchetypProfileLoader,
                LoadedArchetypProfile: !!this.LoadedArchetypProfile,
                ProfileStore: !!this.ProfileStore
            };

            console.log('TiageProfiles initialisiert:', status);
            return this;
        },

        /**
         * Schneller Zugriff auf #ID-Funktionen
         */
        toId: function(key) {
            return this.BeduerfnisIds ? this.BeduerfnisIds.toId(key) : null;
        },

        toKey: function(id) {
            return this.BeduerfnisIds ? this.BeduerfnisIds.toKey(id) : null;
        },

        /**
         * Holt ein Profil mit #IDs
         */
        getProfilMitIds: function(archetypKey) {
            return this.ArchetypProfileLoader ?
                this.ArchetypProfileLoader.getProfilMitIds(archetypKey) : null;
        },

        /**
         * Holt Status-Informationen
         */
        getStatus: function() {
            return {
                version: this.version,
                beduerfnisIdsLoaded: !!this.BeduerfnisIds,
                modifikatorenLoaded: !!this.BeduerfnisModifikatoren,
                archetypProfileLoaded: !!this.ArchetypProfileLoader,
                profileStoreLoaded: !!this.ProfileStore,
                totalNeeds: this.BeduerfnisIds ?
                    this.BeduerfnisIds.getStats().totalIds : 0,
                loadedArchetypen: this.LoadedArchetypProfile ?
                    Object.keys(this.LoadedArchetypProfile).length : 0
            };
        }
    };

    // Global exportieren
    window.TiageProfiles = TiageProfiles;

    // Auto-Initialisierung wenn DOM bereit
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            TiageProfiles.init();
        });
    } else {
        // DOM bereits geladen
        TiageProfiles.init();
    }

})();
