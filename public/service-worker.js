// Service Worker for Portfolio PWA
const CACHE_NAME = 'portfolio-cache-v11';
const BASE_PATH = self.registration ? self.registration.scope : '/';
const CACHE_VERSION = 'v11';

// List of URLs to cache during installation
const ASSETS_TO_CACHE = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}manifest.json`,
  `${BASE_PATH}logo192.png`,
  `${BASE_PATH}logo512.png`,
  `${BASE_PATH}apple-touch-icon.png`,
  // Core assets
  `${BASE_PATH}assets/index-*.js`,
  `${BASE_PATH}assets/index-*.css`,
  // Fonts
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  // Add other critical assets that should be cached on install
];

// Install event - Cache static assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install event');
  
  // Skip waiting to activate the new service worker immediately
  self.skipWaiting();
  
  // Cache core assets
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(ASSETS_TO_CACHE)
          .catch(error => {
            console.error('[ServiceWorker] Cache addAll error:', error);
            // Continue even if some files fail to cache
            return Promise.resolve();
          });
      })
      .then(() => {
        console.log('[ServiceWorker] Installation complete');
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate event');
  
  // Remove old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            // Delete old caches that don't match the current version
            return cacheName.startsWith('portfolio-cache-') && 
                   cacheName !== CACHE_NAME;
          })
          .map((cacheName) => {
            console.log('[ServiceWorker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      // Take control of all clients (tabs) immediately
      console.log('[ServiceWorker] Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - Serve from cache, falling back to network
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  
  // Skip non-GET requests and non-http(s) URLs
  if (event.request.method !== 'GET' || !requestUrl.protocol.match(/^https?:/)) {
    return;
  }
  
  // Skip cross-origin requests that we don't control
  if (new URL(self.location).origin !== requestUrl.origin && 
      !requestUrl.href.includes('fonts.gstatic.com') &&
      !requestUrl.href.includes('fonts.googleapis.com')) {
    return;
  }
  
  // Skip browser extensions and other non-http(s) requests
  if (requestUrl.protocol === 'chrome-extension:' ||
      requestUrl.protocol === 'chrome:' ||
      requestUrl.protocol === 'data:') {
    return;
  }
  
  // Handle navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match(BASE_PATH + 'index.html')
        .then((cachedResponse) => {
          // Return cached version if available
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Otherwise fetch from network and cache
          return fetch(event.request)
            .then((networkResponse) => {
              // Check if we received a valid response
              if (!networkResponse || networkResponse.status !== 200 || 
                  networkResponse.type !== 'basic') {
                return networkResponse;
              }
              
              // Clone the response and cache it
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));
                
              return networkResponse;
            })
            .catch(() => {
              // If offline and no cache, return a simple offline page
              return new Response(
                '<h1>You are offline</h1><p>Please check your internet connection and try again.</p>',
                { 
                  headers: { 'Content-Type': 'text/html' },
                  status: 200,
                  statusText: 'OK'
                }
              );
            });
        })
    );
    return;
  }
  
  // For all other requests, try cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // If we have a cached response, return it
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Otherwise, fetch from network
        return fetch(event.request)
          .then((networkResponse) => {
            // Check if we received a valid response
            if (!networkResponse || networkResponse.status !== 200 || 
                networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Don't cache opaque responses
            if (response.type === 'opaque') {
              return networkResponse;
            }
            
            // Clone the response and cache it
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));
              
            return networkResponse;
          })
          .catch(() => {
            // If the request fails and we're offline, return appropriate responses
            if (event.request.headers.get('accept').includes('image/')) {
              // Return a placeholder image for failed image requests
              return new Response(
                '<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#f0f0f0"/><text x="50%" y="50%" font-family="sans-serif" font-size="10" text-anchor="middle" dy=".3em" fill="#999">Image not available</text></svg>',
                { 
                  headers: { 'Content-Type': 'image/svg+xml' },
                  status: 200,
                  statusText: 'OK'
                }
              );
            }
            
            // For other requests, return a generic error
            return new Response('', { 
              status: 503, 
              statusText: 'Network Error',
              headers: { 'Content-Type': 'text/plain' }
            });
          });
      })
  );
});
