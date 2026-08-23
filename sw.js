const CACHE_NAME = 'netankur-pwa-v3';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/home/',
  '/home/index.html',
  '/home/json/tools.json',
  '/site.webmanifest',
  '/sw.js'
];

// Install Event - Pre-cache essential app shell
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[PWA SW] Pre-caching App Shell');
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

// Activate Event - Clean up stale cache versions
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[PWA SW] Clearing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Stale-While-Revalidate & Dynamic Offline Caching
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request)
        .then(networkResponse => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return cachedResponse || caches.match('/home/index.html');
        });

      return cachedResponse || fetchPromise;
    })
  );
});
