/**
 * TiageAPIClient - Client für Server-Kommunikation
 *
 * Alle Berechnungen werden an den Server delegiert.
 * Bei Server-Ausfall: Lokaler Fallback (aktuelle Client-Logik).
 *
 * @see docs/ARCHITECTURE_CLIENT_SERVER.md
 */

const TiageAPIClient = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // KONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════════

    const config = {
        baseUrl: '/api',  // Wird bei Server-Deployment angepasst
        timeout: 10000,   // 10 Sekunden
        retries: 2,
        useLocalFallback: true  // true = nutze lokale Logik wenn Server nicht erreichbar
    };

    // Server-Status
    let serverAvailable = null;  // null = unbekannt, true/false = getestet

    // ═══════════════════════════════════════════════════════════════════════════
    // HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Führt einen API-Request aus mit Timeout und Retries
     */
    async function apiRequest(endpoint, options = {}) {
        const url = `${config.baseUrl}${endpoint}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.timeout);

        const fetchOptions = {
            ...options,
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        };

        if (options.body && typeof options.body === 'object') {
            fetchOptions.body = JSON.stringify(options.body);
        }

        let lastError;
        for (let attempt = 0; attempt <= config.retries; attempt++) {
            try {
                const response = await fetch(url, fetchOptions);
                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                serverAvailable = true;
                return await response.json();

            } catch (error) {
                lastError = error;
                if (error.name === 'AbortError') {
                    console.warn(`[TiageAPI] Timeout bei ${endpoint} (Versuch ${attempt + 1})`);
                } else {
                    console.warn(`[TiageAPI] Fehler bei ${endpoint}:`, error.message);
                }

                if (attempt < config.retries) {
                    await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
                }
            }
        }

        serverAvailable = false;
        throw lastError;
    }

    /**
     * Wrapper: Versucht Server, fällt auf lokale Logik zurück
     */
    async function withFallback(serverCall, localFallback, operationName) {
        // Wenn Server definitiv nicht verfügbar und Fallback aktiviert
        if (serverAvailable === false && config.useLocalFallback) {
            console.info(`[TiageAPI] ${operationName}: Nutze lokalen Fallback (Server nicht verfügbar)`);
            return localFallback();
        }

        try {
            return await serverCall();
        } catch (error) {
            if (config.useLocalFallback) {
                console.warn(`[TiageAPI] ${operationName}: Server-Fehler, nutze lokalen Fallback`);
                return localFallback();
            }
            throw error;
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // BERECHNUNG (4 Endpoints)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * POST /api/calculate/synthesis
     * Q-Formel: Q = Σ(Faktor × Gewicht × R)
     */
    async function calculateSynthesis(ichProfile, partnerProfile, options = {}) {

// FIX: Skip API on GitHub Pages - use local calculation directly
    if (typeof TiageSynthesis !== 'undefined') {
        return TiageSynthesis.Calculator.calculate(ichProfile, partnerProfile, options);
    }

        return withFallback(
            () => apiRequest('/calculate/synthesis', {
                method: 'POST',
                body: { ich: ichProfile, partner: partnerProfile, options }
            }),
            () => {
                // Lokaler Fallback: Aktuelle Client-Logik
                if (typeof TiageSynthesis !== 'undefined') {
                    return TiageSynthesis.Calculator.calculate(ichProfile, partnerProfile, options);
                }
                throw new Error('Lokaler Fallback nicht verfügbar (TiageSynthesis)');
            },
            'calculateSynthesis'
        );
    }

    /**
     * POST /api/calculate/resonance
     * R-Faktoren (R1-R4) aus Profil berechnen
     */
    async function calculateResonance(person, profile) {
        return withFallback(
            () => apiRequest('/calculate/resonance', {
                method: 'POST',
                body: { person, profile }
            }),
            () => {
                if (typeof TiageSynthesis !== 'undefined' && TiageSynthesis.NeedsIntegration) {
                    return TiageSynthesis.NeedsIntegration.calculateDimensionalResonance(person);
                }
                throw new Error('Lokaler Fallback nicht verfügbar (NeedsIntegration)');
            },
            'calculateResonance'
        );
    }

    /**
     * POST /api/calculate/matrix
     * 8×8 Archetyp-Kompatibilitäts-Matrix
     */
    async function calculateMatrix() {
        return withFallback(
            () => apiRequest('/calculate/matrix', { method: 'POST' }),
            () => {
                if (typeof ArchetypeMatrixCalculator !== 'undefined') {
                    return ArchetypeMatrixCalculator.calculateMatrix();
                }
                throw new Error('Lokaler Fallback nicht verfügbar (ArchetypeMatrixCalculator)');
            },
            'calculateMatrix'
        );
    }

    /**
     * POST /api/calculate/compatibility
     * Pathos + Logos Orchestrator (bisher kein UI)
     */
    async function calculateCompatibility(ichProfile, partnerProfile) {
        return withFallback(
            () => apiRequest('/calculate/compatibility', {
                method: 'POST',
                body: { ich: ichProfile, partner: partnerProfile }
            }),
            () => {
                if (typeof CompatibilityOrchestrator !== 'undefined') {
                    return CompatibilityOrchestrator.calculate(ichProfile, partnerProfile);
                }
                throw new Error('Lokaler Fallback nicht verfügbar (CompatibilityOrchestrator)');
            },
            'calculateCompatibility'
        );
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // SORTIERUNG (2 Endpoints)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * POST /api/sort/needs
     * 224 Bedürfnisse sortieren
     */
    async function sortNeeds(ichNeeds, partnerNeeds, sortBy = 'difference', limit = null) {
        return withFallback(
            () => apiRequest('/sort/needs', {
                method: 'POST',
                body: { ichNeeds, partnerNeeds, sortBy, limit }
            }),
            () => {
                // Lokaler Fallback: Einfache Sortierung
                const needs = Object.keys(ichNeeds).map(id => ({
                    id,
                    ichValue: ichNeeds[id],
                    partnerValue: partnerNeeds[id] || 0,
                    difference: Math.abs(ichNeeds[id] - (partnerNeeds[id] || 0))
                }));

                switch (sortBy) {
                    case 'difference':
                        needs.sort((a, b) => b.difference - a.difference);
                        break;
                    case 'similarity':
                        needs.sort((a, b) => a.difference - b.difference);
                        break;
                    case 'importance':
                        needs.sort((a, b) => (b.ichValue + b.partnerValue) - (a.ichValue + a.partnerValue));
                        break;
                }

                return { sorted: limit ? needs.slice(0, limit) : needs };
            },
            'sortNeeds'
        );
    }

    /**
     * POST /api/sort/categories
     * 18 Kategorien nach Durchschnitt sortieren
     */
    async function sortCategories(needs, sortBy = 'average') {
        return withFallback(
            () => apiRequest('/sort/categories', {
                method: 'POST',
                body: { needs, sortBy }
            }),
            () => {
                // Lokaler Fallback: Gruppiere nach Kategorie und sortiere
                console.warn('[TiageAPI] sortCategories: Lokaler Fallback nicht implementiert');
                return { sorted: [] };
            },
            'sortCategories'
        );
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // FILTER (2 Endpoints)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * POST /api/filter/lifestyle
     * K.O.-Kriterien prüfen
     */
    async function filterLifestyle(ichLifestyle, partnerLifestyle) {
        return withFallback(
            () => apiRequest('/filter/lifestyle', {
                method: 'POST',
                body: { ich: ichLifestyle, partner: partnerLifestyle }
            }),
            () => {
                if (typeof LifestyleFilter !== 'undefined') {
                    return LifestyleFilter.check(ichLifestyle, partnerLifestyle);
                }
                throw new Error('Lokaler Fallback nicht verfügbar (LifestyleFilter)');
            },
            'filterLifestyle'
        );
    }

    /**
     * POST /api/filter/needs
     * Bedürfnisse nach Schwellwert filtern
     */
    async function filterNeeds(needs, threshold, options = {}) {
        return withFallback(
            () => apiRequest('/filter/needs', {
                method: 'POST',
                body: { needs, threshold, ...options }
            }),
            () => {
                // Lokaler Fallback
                const filtered = Object.entries(needs)
                    .filter(([id, value]) => value >= threshold)
                    .reduce((acc, [id, value]) => ({ ...acc, [id]: value }), {});
                return { filtered, count: Object.keys(filtered).length };
            },
            'filterNeeds'
        );
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // TEXT-GENERIERUNG (3 Endpoints)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * POST /api/generate/pathos
     * Emotionale Beziehungstexte
     */
    async function generatePathos(synthesisResult, options = {}) {
        return withFallback(
            () => apiRequest('/generate/pathos', {
                method: 'POST',
                body: { synthesisResult, ...options }
            }),
            () => {
                if (typeof PathosTextGenerator !== 'undefined') {
                    return PathosTextGenerator.generate(synthesisResult, options);
                }
                throw new Error('Lokaler Fallback nicht verfügbar (PathosTextGenerator)');
            },
            'generatePathos'
        );
    }

    /**
     * POST /api/generate/logos
     * Rationale Analyse-Texte
     */
    async function generateLogos(synthesisResult, options = {}) {
        return withFallback(
            () => apiRequest('/generate/logos', {
                method: 'POST',
                body: { synthesisResult, ...options }
            }),
            () => {
                if (typeof LogosTextGenerator !== 'undefined') {
                    return LogosTextGenerator.generate(synthesisResult, options);
                }
                throw new Error('Lokaler Fallback nicht verfügbar (LogosTextGenerator)');
            },
            'generateLogos'
        );
    }

    /**
     * POST /api/generate/oshozen
     * Spirituelle Interpretationen
     */
    async function generateOshoZen(synthesisResult, options = {}) {
        return withFallback(
            () => apiRequest('/generate/oshozen', {
                method: 'POST',
                body: { synthesisResult, ...options }
            }),
            () => {
                if (typeof OshoZenTextGenerator !== 'undefined') {
                    return OshoZenTextGenerator.generate(synthesisResult, options);
                }
                throw new Error('Lokaler Fallback nicht verfügbar (OshoZenTextGenerator)');
            },
            'generateOshoZen'
        );
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PROFIL-VERWALTUNG (4 Endpoints)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * POST /api/profile/save
     * Profil speichern (slot 1-4)
     */
    async function saveProfile(person, slot, profile) {
        return withFallback(
            () => apiRequest('/profile/save', {
                method: 'POST',
                body: { person, slot, profile }
            }),
            () => {
                if (typeof MemoryManager !== 'undefined') {
                    MemoryManager.saveToSlot(person, slot, profile);
                    return { success: true, slot, person, savedAt: new Date().toISOString() };
                }
                throw new Error('Lokaler Fallback nicht verfügbar (MemoryManager)');
            },
            'saveProfile'
        );
    }

    /**
     * GET /api/profile/load/:slot/:person
     * Profil laden
     */
    async function loadProfile(person, slot) {
        return withFallback(
            () => apiRequest(`/profile/load/${slot}/${person}`, { method: 'GET' }),
            () => {
                if (typeof MemoryManager !== 'undefined') {
                    const profile = MemoryManager.loadFromSlot(person, slot);
                    return { success: true, profile };
                }
                throw new Error('Lokaler Fallback nicht verfügbar (MemoryManager)');
            },
            'loadProfile'
        );
    }

    /**
     * GET /api/profile/list
     * Alle Profile auflisten
     */
    async function listProfiles() {
        return withFallback(
            () => apiRequest('/profile/list', { method: 'GET' }),
            () => {
                if (typeof MemoryManager !== 'undefined') {
                    return { profiles: MemoryManager.listAll() };
                }
                throw new Error('Lokaler Fallback nicht verfügbar (MemoryManager)');
            },
            'listProfiles'
        );
    }

    /**
     * DELETE /api/profile/:slot/:person
     * Profil löschen
     */
    async function deleteProfile(person, slot) {
        return withFallback(
            () => apiRequest(`/profile/${slot}/${person}`, { method: 'DELETE' }),
            () => {
                if (typeof MemoryManager !== 'undefined') {
                    MemoryManager.deleteSlot(person, slot);
                    return { success: true };
                }
                throw new Error('Lokaler Fallback nicht verfügbar (MemoryManager)');
            },
            'deleteProfile'
        );
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // SYNC (2 Endpoints)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * POST /api/sync/state
     * Client ↔ Server synchronisieren (Last-Write-Wins)
     *
     * @param {Object} syncData - { state, lastSyncAt, clientTimestamp }
     * @returns {Object} { success, result: { synced, serverTime, action, changes } }
     */
    async function syncState(syncData) {
        // Bei bekanntem Server-Ausfall: Keine Fallback-Logik für Sync
        // (Sync macht nur Sinn wenn Server erreichbar)
        if (serverAvailable === false) {
            console.warn('[TiageAPI] syncState: Server nicht erreichbar');
            throw new Error('Kein Kontakt zum Server');
        }

        try {
            const response = await apiRequest('/sync/state', {
                method: 'POST',
                body: syncData
            });
            return response;
        } catch (error) {
            // Bei Sync-Fehler: Kein lokaler Fallback, Fehler durchreichen
            console.error('[TiageAPI] syncState fehlgeschlagen:', error.message);
            throw new Error('Kein Kontakt zum Server');
        }
    }

    /**
     * POST /api/sync/recalculate
     * Alle Werte neu berechnen
     */
    async function recalculateAll() {
        return withFallback(
            () => apiRequest('/sync/recalculate', { method: 'POST' }),
            () => {
                // Lokaler Fallback: Trigger lokale Neuberechnung
                if (typeof TiageState !== 'undefined') {
                    TiageState.publish('recalculate', {});
                    return { success: true, local: true };
                }
                throw new Error('Lokaler Fallback nicht verfügbar (TiageState)');
            },
            'recalculateAll'
        );
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // STAMMDATEN - READ-ONLY (4 Endpoints)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * GET /api/data/needs
     * 224 Bedürfnisse (Katalog/Definition)
     */
    async function getNeeds() {
        return withFallback(
            () => apiRequest('/data/needs', { method: 'GET' }),
            () => {
                if (typeof BeduerfnisKatalog !== 'undefined') {
                    return { needs: BeduerfnisKatalog.getAll() };
                }
                throw new Error('Lokaler Fallback nicht verfügbar (BeduerfnisKatalog)');
            },
            'getNeeds'
        );
    }

    /**
     * GET /api/data/archetypes
     * 8 Archetypen-Definitionen
     */
    async function getArchetypes() {
        return withFallback(
            () => apiRequest('/data/archetypes', { method: 'GET' }),
            async () => {
                // Lokaler Fallback: Lade aus archetype-matrix.json
                try {
                    const response = await fetch('archetype-matrix.json');
                    const data = await response.json();
                    return { archetypes: data.archetypes || data };
                } catch (e) {
                    throw new Error('Lokaler Fallback nicht verfügbar (archetype-matrix.json)');
                }
            },
            'getArchetypes'
        );
    }

    /**
     * GET /api/data/taxonomy
     * Perspektiven, Dimensionen, Kategorien
     */
    async function getTaxonomy() {
        return withFallback(
            () => apiRequest('/data/taxonomy', { method: 'GET' }),
            () => {
                if (typeof Taxonomie !== 'undefined') {
                    return {
                        perspektiven: Taxonomie.PERSPEKTIVEN,
                        dimensionen: Taxonomie.DIMENSIONEN,
                        kategorien: Taxonomie.KATEGORIEN
                    };
                }
                throw new Error('Lokaler Fallback nicht verfügbar (Taxonomie)');
            },
            'getTaxonomy'
        );
    }

    /**
     * GET /api/data/archetype-profile/:name
     * 224 Gewichtungen für einen Archetyp
     */
    async function getArchetypeProfile(archetypeName) {
        return withFallback(
            () => apiRequest(`/data/archetype-profile/${archetypeName}`, { method: 'GET' }),
            async () => {
                // Lokaler Fallback: Lade aus profiles/archetypen/
                try {
                    const response = await fetch(`profiles/archetypen/${archetypeName}.js`);
                    // JS-Datei wird als Modul geladen
                    if (typeof window[`${archetypeName}Profile`] !== 'undefined') {
                        return { profile: window[`${archetypeName}Profile`] };
                    }
                    throw new Error(`Archetyp-Profil ${archetypeName} nicht geladen`);
                } catch (e) {
                    throw new Error(`Lokaler Fallback nicht verfügbar (${archetypeName}.js)`);
                }
            },
            'getArchetypeProfile'
        );
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // STATUS & KONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Prüft ob Server erreichbar ist
     */
    async function checkServerStatus() {
        try {
            await apiRequest('/health', { method: 'GET' });
            serverAvailable = true;
            return { available: true };
        } catch (e) {
            serverAvailable = false;
            return { available: false, error: e.message };
        }
    }

    /**
     * Konfiguration ändern
     */
    function configure(options) {
        Object.assign(config, options);
        console.info('[TiageAPI] Konfiguration aktualisiert:', config);
    }

    /**
     * Status abfragen
     */
    function getStatus() {
        return {
            serverAvailable,
            config: { ...config }
        };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Berechnung
        calculateSynthesis,
        calculateResonance,
        calculateMatrix,
        calculateCompatibility,

        // Sortierung
        sortNeeds,
        sortCategories,

        // Filter
        filterLifestyle,
        filterNeeds,

        // Text-Generierung
        generatePathos,
        generateLogos,
        generateOshoZen,

        // Profil-Verwaltung
        saveProfile,
        loadProfile,
        listProfiles,
        deleteProfile,

        // Sync
        syncState,
        recalculateAll,

        // Stammdaten
        getNeeds,
        getArchetypes,
        getTaxonomy,
        getArchetypeProfile,

        // Status & Konfiguration
        checkServerStatus,
        configure,
        getStatus
    };

})();

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageAPIClient;
}
