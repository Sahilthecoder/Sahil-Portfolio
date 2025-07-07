// Service Worker for Sahil's Portfolio
const CACHE_NAME = 'sahil-portfolio-v1';
const BASE_PATH = '/Sahil-Portfolio/';

// Files to cache
const ASSETS = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}assets/index-*.js`,
  `${BASE_PATH}assets/index-*.css`,
  `${BASE_PATH}assets/logo192.png`,
  `${BASE_PATH}assets/logo512.png`,
  `${BASE_PATH}favicon.ico`,
  `${BASE_PATH}favicon-16x16.png`,
  `${BASE_PATH}favicon-32x32.png`,
  `${BASE_PATH}apple-touch-icon.png`,
  `${BASE_PATH}android-chrome-192x192.png`,
  `${BASE_PATH}android-chrome-512x512.png`,
  `${BASE_PATH}safari-pinned-tab.svg`,
  `${BASE_PATH}site.webmanifest`,
  `${BASE_PATH}browserconfig.xml`
];

// Install event - cache all static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(ASSETS);
      })
  );
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
});

// Helper function to get the cache key for a request
const getCacheKey = (request) => {
  const url = new URL(request.url);
  
  // If this is a request from our origin, ensure it includes the base path
  if (url.origin === self.location.origin) {
    // If the path doesn't start with the base path, add it
    if (!url.pathname.startsWith(BASE_PATH)) {
      const newPath = BASE_PATH + url.pathname.replace(/^\//, '');
      return new Request(new URL(newPath, self.location.origin).toString(), request);
    }
  }
  
  return request;
};

// Fetch event - serve from cache, falling back to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and chrome-extension requests
  if (event.request.method !== 'GET' || 
      event.request.url.startsWith('chrome-extension://') ||
      event.request.url.includes('browser-sync')) {
    return;
  }

  // Handle navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match(BASE_PATH + 'index.html')
        .then((response) => {
          return response || fetch(event.request);
        })
    );
    return;
  }

  // Handle other requests (assets, etc.)
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();
        const requestUrl = new URL(event.request.url);
        
        // Skip non-http/https requests
        if (!requestUrl.protocol.startsWith('http')) {
          return fetch(fetchRequest);
        }

        // Handle different types of requests
        return fetch(fetchRequest).then(
          (response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the response for future use
            caches.open(CACHE_NAME).then((cache) => {
              // Only cache GET requests and same-origin responses
              if (event.request.method === 'GET' && 
                  response.type === 'basic' && 
                  requestUrl.origin === self.location.origin) {
                cache.put(event.request, responseToCache);
              }
            });

            return response;
          }
        );
      })
  );
});
