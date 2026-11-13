const CACHE_NAME = 'rakeeeen-v1';
// The worker's scope is the site's base path (/Rakeeen/ on GitHub Pages, / on Firebase).
const BASE = self.registration.scope;
const OFFLINE_URL = `${BASE}offline.html`;

const ASSETS_TO_CACHE = [BASE, `${BASE}index.html`, OFFLINE_URL];

// Install: cache offline page immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from network, fallback to offline page on failure
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.open(CACHE_NAME).then((cache) => cache.match(OFFLINE_URL))
      )
    );
  }
});
