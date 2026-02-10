/**
 * Ti-Age Service Worker für Offline-Caching und Performance
 * Version: 1.1.0 - Erweiterte Precache-Liste
 */

const CACHE_NAME = 'tiage-v91';
const STATIC_CACHE_NAME = 'tiage-static-v85';

// Kritische Ressourcen die sofort gecacht werden
const PRECACHE_URLS = [
    '/',
    '/archetype-interaction.html',
    '/templates/variables.css',
    '/templates/template_desktop.css',
    '/templates/template_mobile.css',
    '/js/state.js',
    '/js/config.js',
    '/js/i18n.js',
    '/js/locales/de.js',
    '/js/locales/loader.js',
    '/js/utils/performance.js',
    '/js/utils/fuzzySearch.js',
    '/js/synthesis/constants.js',
    '/js/synthesis/synthesisCalculator.js',
    '/js/core/tooltips.js',
    '/js/core/archetypeDescriptions.js',
    '/js/core/tagTooltips.js',
    '/js/core/statementHelpers.js',
    '/js/ui/chartUtils.js',
    '/css/slot-machine.css'
];

// URLs die nicht gecacht werden sollen
const NO_CACHE_PATTERNS = [
    /script\.google\.com/,
    /\.hot-update\./,
    /\?nocache/
];

// Installation - Precache kritische Ressourcen
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then(cache => {
                console.log('[SW] Precaching kritische Ressourcen');
                return cache.addAll(PRECACHE_URLS.map(url => {
                    return new Request(url, { cache: 'reload' });
                })).catch(err => {
                    console.warn('[SW] Precache fehlgeschlagen:', err);
                });
            })
            .then(() => self.skipWaiting())
    );
});

// Aktivierung - Alte Caches löschen
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME && name !== STATIC_CACHE_NAME)
                    .map(name => {
                        console.log('[SW] Lösche alten Cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch - Network-First mit Cache-Fallback (v1.2.0 - Fix für Response-Fehler)
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Ignoriere nicht-GET Requests
    if (event.request.method !== 'GET') return;

    // Ignoriere externe APIs
    if (NO_CACHE_PATTERNS.some(pattern => pattern.test(url.href))) return;

    // Nur same-origin Requests cachen
    if (url.origin !== location.origin) return;

    event.respondWith(
        fetch(event.request)
            .then(networkResponse => {
                // Nur erfolgreiche Antworten cachen
                if (networkResponse && networkResponse.status === 200) {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            })
            .catch(() => {
                // Netzwerk fehlgeschlagen - versuche Cache
                return caches.match(event.request);
            })
    );
});

// Nachricht von der App empfangen
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.keys().then(names => {
            names.forEach(name => caches.delete(name));
        });
    }
});
