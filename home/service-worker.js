const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/home/', // Ensure the base URL is cached
  '/home/index.html',
  '/home/css/styles.css',
  '/home/js/app.js',
  '/home/assets/img/icon.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});