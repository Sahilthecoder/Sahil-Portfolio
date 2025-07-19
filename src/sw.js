// Service Worker for Portfolio PWA
const CACHE_NAME = 'portfolio-cache-v14';
const BASE_PATH = '/Sahil-Portfolio';

const ASSETS_TO_CACHE = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/about`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/images/logo192.png`,
  `${BASE_PATH}/images/logo512.png`,
  `${BASE_PATH}/images/favicon.ico`,
  `${BASE_PATH}/images/favicon-16x16.png`,
  `${BASE_PATH}/images/favicon-32x32.png`,
  `${BASE_PATH}/images/og-default.jpg`,
  `${BASE_PATH}/fonts/Roboto.woff2`,
  `${BASE_PATH}/fonts/Poppins.woff2`,
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, falling back to network
self.addEventListener('fetch', (event) => {
  // Handle navigation requests for the base path
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match(`${BASE_PATH}/index.html`)
        .then((response) => response || fetch(event.request))
    );
    return;
  }

  // For other requests, try cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(
          (response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the response
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});
