/**
 * Bedürfnis Image Loader
 *
 * Hilfsmodul zum Laden und Anzeigen von Bedürfnis-Bildern
 * Die Bilder müssen im Ordner /assets/images/beduerfnisse-v2/ liegen
 *
 * Erwartetes Format: WebP, 400x600px, 8-bit Farbtiefe
 * Dateinamen: B001.webp bis B226.webp
 */

const BeduerfnisImages = (function() {
    'use strict';

    const BASE_PATH = '/assets/images/beduerfnisse-v2/';
    const PLACEHOLDER_SVG = `data:image/svg+xml,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
            <rect fill="#1a1625" width="400" height="600"/>
            <rect fill="#2d2640" x="20" y="20" width="360" height="560" rx="10"/>
            <text fill="#6b5b95" x="200" y="280" text-anchor="middle" font-family="Arial" font-size="48">?</text>
            <text fill="#8b7ba5" x="200" y="340" text-anchor="middle" font-family="Arial" font-size="14">Bild wird geladen...</text>
        </svg>
    `)}`;

    let imageMapping = null;
    let loadingPromise = null;

    /**
     * Lädt das Image-Mapping aus der JSON-Datei
     */
    async function loadMapping() {
        if (imageMapping) return imageMapping;
        if (loadingPromise) return loadingPromise;

        loadingPromise = fetch(BASE_PATH + 'image-mapping.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Image mapping nicht gefunden');
                }
                return response.json();
            })
            .then(data => {
                imageMapping = data;
                return data;
            })
            .catch(error => {
                console.warn('BeduerfnisImages: Mapping konnte nicht geladen werden', error);
                imageMapping = { images: {} };
                return imageMapping;
            });

        return loadingPromise;
    }

    /**
     * Konvertiert Bedürfnis-ID zu Dateinamen
     * @param {string} beduerfnisId - z.B. "#B52" oder "B52"
     * @returns {string} - z.B. "B052.webp"
     */
    function idToFilename(beduerfnisId) {
        const id = beduerfnisId.replace('#', '').replace('B', '');
        const num = parseInt(id, 10);
        if (isNaN(num) || num < 1 || num > 226) {
            return null;
        }
        return `B${num.toString().padStart(3, '0')}.webp`;
    }

    /**
     * Gibt den vollständigen Bildpfad für ein Bedürfnis zurück
     * @param {string} beduerfnisId - z.B. "#B52"
     * @returns {string} - Vollständiger Pfad zum Bild
     */
    function getImagePath(beduerfnisId) {
        const filename = idToFilename(beduerfnisId);
        if (!filename) return PLACEHOLDER_SVG;
        return BASE_PATH + filename;
    }

    /**
     * Prüft ob ein Bild existiert
     * @param {string} beduerfnisId - z.B. "#B52"
     * @returns {Promise<boolean>}
     */
    async function imageExists(beduerfnisId) {
        const path = getImagePath(beduerfnisId);
        if (path === PLACEHOLDER_SVG) return false;

        try {
            const response = await fetch(path, { method: 'HEAD' });
            return response.ok;
        } catch {
            return false;
        }
    }

    /**
     * Gibt Bild-Info aus dem Mapping zurück
     * @param {string} beduerfnisId - z.B. "#B52"
     * @returns {Promise<Object|null>}
     */
    async function getImageInfo(beduerfnisId) {
        const mapping = await loadMapping();
        const normalizedId = beduerfnisId.startsWith('#') ? beduerfnisId : '#' + beduerfnisId;
        return mapping.images[normalizedId] || null;
    }

    /**
     * Erstellt ein Image-Element mit Lazy Loading
     * @param {string} beduerfnisId - z.B. "#B52"
     * @param {Object} options - Optionale Einstellungen
     * @returns {HTMLImageElement}
     */
    function createImageElement(beduerfnisId, options = {}) {
        const img = document.createElement('img');
        const path = getImagePath(beduerfnisId);

        img.loading = 'lazy';
        img.decoding = 'async';
        img.alt = options.alt || `Bedürfnis ${beduerfnisId}`;
        img.className = options.className || 'beduerfnis-image';

        // Placeholder während des Ladens
        img.src = PLACEHOLDER_SVG;

        // Echtes Bild laden
        if (path !== PLACEHOLDER_SVG) {
            const realImg = new Image();
            realImg.onload = () => {
                img.src = path;
            };
            realImg.onerror = () => {
                // Placeholder bleibt bei Fehler
                console.warn(`Bild nicht gefunden: ${path}`);
            };
            realImg.src = path;
        }

        return img;
    }

    /**
     * Gibt Statistiken über verfügbare Bilder zurück
     * @returns {Promise<Object>}
     */
    async function getStatistics() {
        const mapping = await loadMapping();
        const totalExpected = 226;
        let available = 0;
        let missing = [];

        for (let i = 1; i <= totalExpected; i++) {
            const id = `#B${i}`;
            const exists = await imageExists(id);
            if (exists) {
                available++;
            } else {
                missing.push(id);
            }
        }

        return {
            total: totalExpected,
            available,
            missing: missing.length,
            missingIds: missing,
            percentage: Math.round((available / totalExpected) * 100)
        };
    }

    /**
     * Preloads wichtige Bilder
     * @param {string[]} beduerfnisIds - Array von IDs zum Vorladen
     */
    function preloadImages(beduerfnisIds) {
        beduerfnisIds.forEach(id => {
            const path = getImagePath(id);
            if (path !== PLACEHOLDER_SVG) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = path;
                document.head.appendChild(link);
            }
        });
    }

    // Public API
    return {
        getImagePath,
        imageExists,
        getImageInfo,
        createImageElement,
        getStatistics,
        preloadImages,
        loadMapping,
        PLACEHOLDER_SVG,
        BASE_PATH
    };
})();

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BeduerfnisImages;
}
