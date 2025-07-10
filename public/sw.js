// Service Worker for Portfolio PWA
const CACHE_NAME = 'portfolio-cache-v16';
const OFFLINE_PAGE = '/offline.html';
const BASE_PATH = '/Sahil-Portfolio';
const ASSETS_TO_CACHE = [
  '/Sahil-Portfolio/',
  '/Sahil-Portfolio/index.html',
  '/Sahil-Portfolio/about.html',
  '/Sahil-Portfolio/site.webmanifest',
  '/Sahil-Portfolio/favicon.ico',
  '/Sahil-Portfolio/favicon-16x16.png',
  '/Sahil-Portfolio/favicon-32x32.png',
  '/Sahil-Portfolio/apple-touch-icon.png',
  '/Sahil-Portfolio/safari-pinned-tab.svg',
  '/Sahil-Portfolio/mstile-150x150.png',
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

  // Handle requests with different base URLs
  const requestUrl = new URL(event.request.url);
  const path = requestUrl.pathname;
  
  // For root path, serve index.html
  if (path.endsWith('/') || path.endsWith('/index.html') || path === '') {
    event.respondWith(
      caches.match(`${BASE_PATH}/index.html`)
        .then(response => response || fetch(event.request))
    );
    return;
  }
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html')
        .then(cachedResponse => {
          return cachedResponse || fetchAndCache(event.request);
        })
        .catch(() => {
          // If both cache and network fail, show a fallback
          return caches.match(OFFLINE_PAGE)
            .then(response => response || new Response('You are offline. Please check your internet connection.'));
        })
    );
    return;
  }

  // For all other requests, try cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }
        // Otherwise, try the network
        return fetchAndCache(event.request);
      })
      .catch(error => {
        console.error('Fetch failed; returning offline fallback.', error);
        
        // If it's an image, return a placeholder
        const acceptHeader = event.request.headers.get('accept') || '';
        if (acceptHeader.includes('image/')) {
          return new Response(
            '<svg role="img" aria-labelledby="offline-title" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>',
            { 
              headers: { 
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'no-store'
              } 
            }
          );
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
