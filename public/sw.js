// Service Worker for Portfolio PWA
const CACHE_NAME = 'portfolio-cache-v16';
const OFFLINE_PAGE = '/offline.html';
const BASE_PATH = '/Sahil-Portfolio';
const ASSETS_TO_CACHE = [
  '/Sahil-Portfolio/',
  '/Sahil-Portfolio/index.html',
  '/Sahil-Portfolio/about.html',
  '/Sahil-Portfolio/site.webmanifest',
  '/Sahil-Portfolio/favicons/favicon.ico',
  '/Sahil-Portfolio/favicons/favicon-16x16.png',
  '/Sahil-Portfolio/favicons/favicon-32x32.png',
  '/Sahil-Portfolio/favicons/apple-touch-icon.png',
  '/Sahil-Portfolio/favicons/safari-pinned-tab.svg',
  '/Sahil-Portfolio/favicons/mstile-150x150.png',
  '/Sahil-Portfolio/assets/fonts/Roboto.woff2',
  '/Sahil-Portfolio/assets/fonts/Poppins.woff2'
];

// Helper function to handle GitHub Pages base path
function getPathWithBase(path) {
  return path.startsWith(BASE_PATH) ? path : `${BASE_PATH}${path}`;
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Cache each file individually to prevent complete failure if one file fails
        return Promise.all(
          ASSETS_TO_CACHE.map(assetUrl => {
            // Use the full URL for GitHub Pages
            const url = assetUrl.startsWith('http') ? assetUrl : `${self.location.origin}${assetUrl}`;
            return fetch(url, { credentials: 'same-origin', mode: 'no-cors' })
              .then(response => {
                if (response.ok) {
                  return cache.put(url, response);
                }
                console.warn('Failed to cache:', url);
                return null;
              })
              .catch(err => {
                console.warn('Error caching', url, err);
                return null;
              });
          })
        );
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
          return null;
        })
      );
    })
  );
  self.clients.claim();
});

// Helper function to fetch and cache responses
async function fetchAndCache(request) {
  try {
    const response = await fetch(request);
    
    // Check if we received a valid response
    if (!response || response.status !== 200 || response.type !== 'basic') {
      return response;
    }

    // Clone the response
    const responseToCache = response.clone();
    
    // Cache the response
    try {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, responseToCache);
    } catch (cacheError) {
      console.warn('Failed to cache response for', request.url, cacheError);
    }

    return response;
  } catch (error) {
    console.error('Fetch failed for', request.url, error);
    throw error;
  }
}

// Fetch event - serve from cache, falling back to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and chrome-extension requests
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const requestPath = requestUrl.pathname;

  // Handle navigation requests (HTML pages)
  // For SPA, serve index.html for all navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match(new URL('/Sahil-Portfolio/index.html', self.location.origin))
        .then((cachedResponse) => {
          return cachedResponse || fetch(event.request).catch(() => {
            return caches.match(new URL('/Sahil-Portfolio/offline.html', self.location.origin));
          });
        })
    );
    return;
  }

  // For non-navigation requests, try cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // For API requests, try network first
        if (event.request.url.includes('/api/')) {
          return fetchAndCache(event.request);
        }

        // For other assets, try network then cache
        return fetchAndCache(event.request)
          .catch(() => {
            // If offline and not in cache, return offline page for HTML requests
            if (event.request.headers.get('accept')?.includes('text/html')) {
              return caches.match(new URL('/Sahil-Portfolio/offline.html', self.location.origin));
            }
            // Return a 404 response for any other case
            return new Response('Not found', { status: 404, statusText: 'Not Found' });
          });
        }
        
        // Otherwise return a generic offline response
        return new Response('You are offline. Please check your internet connection.', {
          status: 503,
          statusText: 'Offline',
          headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-store'
          }
        });
      })
  );
});
