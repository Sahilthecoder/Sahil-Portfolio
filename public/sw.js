// Service Worker for Portfolio PWA
const CACHE_NAME = 'portfolio-cache-v14';
const BASE_PATH = '/Sahil-Portfolio';
const ASSETS_TO_CACHE = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/site.webmanifest`,
  `${BASE_PATH}/images/logo192.png`,
  `${BASE_PATH}/images/logo512.png`,
  `${BASE_PATH}/favicon.ico`,
  `${BASE_PATH}/images/favicon-16x16.png`,
  `${BASE_PATH}/images/favicon-32x32.png`,
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch(error => {
        console.error('Cache addAll error:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, falling back to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests except for Google Fonts
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.startsWith('https://fonts.googleapis.com') &&
      !event.request.url.startsWith('https://fonts.gstatic.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        return response;
      }

      // Otherwise, fetch from network
      return fetch(event.request)
        .then((networkResponse) => {
          // Only cache successful responses and same-origin requests
          if (!networkResponse || networkResponse.status !== 200 || 
              networkResponse.type !== 'basic' || 
              !event.request.url.startsWith(self.location.origin)) {
            return networkResponse;
          }

          // Clone the response
          const responseToCache = networkResponse.clone();

          // Cache the response
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // If this is a page request, return the offline page
          if (event.request.mode === 'navigate') {
            return caches.match('./offline.html');
          }
          // Otherwise return a generic offline response
          return new Response('You are offline and no cache is available for this page.', {
            status: 408,
            statusText: 'Network Error',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
    })
  );
});
