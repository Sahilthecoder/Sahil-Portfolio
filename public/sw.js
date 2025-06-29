// Service Worker for Portfolio PWA
const CACHE_NAME = 'portfolio-cache-v6';
const BASE_PATH = '/Sahil-Portfolio/'; // Hardcode base path for GitHub Pages

// Add a trailing slash to the base path if it doesn't have one
const ensureTrailingSlash = (path) => path.endsWith('/') ? path : `${path}/`;
const BASE = ensureTrailingSlash(BASE_PATH);

// List of URLs to cache during installation
const ASSETS_TO_CACHE = [
  BASE,
  `${BASE}index.html`,
  `${BASE}manifest.json`,
  `${BASE}logo192.png`,
  `${BASE}logo512.png`,
  `${BASE}images/apple-touch-icon.png`,
  // Add other assets that should be cached on install
];

// Cache Google Fonts
const GOOGLE_FONTS_CACHE = 'google-fonts-cache';
const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css2';
const GOOGLE_STATIC_FONTS = 'https://fonts.gstatic.com';

// Cache these font files when they're requested
const FONTS_TO_CACHE = [
  '/fonts/Inter.var.woff2',
  '/fonts/FiraCode.var.woff2'
];

// Install event - Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Handle font requests
function isFontRequest(url) {
  return url.includes('fonts.googleapis.com') || 
         url.includes('fonts.gstatic.com') ||
         url.endsWith('.woff2') || 
         url.endsWith('.woff') ||
         url.endsWith('.ttf');
}

// Fetch event - Serve from cache, falling back to network
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  
  // Handle font requests
  if (isFontRequest(requestUrl.href)) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) return response;
        
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          
          const responseToCache = networkResponse.clone();
          caches.open(GOOGLE_FONTS_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          
          return networkResponse;
        });
      })
    );
    return;
  }
  // Skip non-GET requests and cross-origin requests
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(BASE_PATH + 'index.html'))
    );
    return;
  }

  // Handle other requests
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise, fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache error responses or non-GET requests
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            // Cache the successful response
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache));

            return response;
          });
      })
      .catch(() => {
        // If both cache and network fail, return offline page for HTML requests
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match(BASE_PATH + 'index.html');
        }
        return new Response('', { status: 404, statusText: 'Not Found' });
      })
  );
});
