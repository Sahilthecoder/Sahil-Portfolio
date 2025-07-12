// Service Worker for Portfolio PWA
const CACHE_NAME = 'portfolio-cache-v17';
const OFFLINE_PAGE = '/Sahil-Portfolio/offline.html';
const BASE_PATH = '/Sahil-Portfolio';
const ASSETS_TO_CACHE = [
  '/Sahil-Portfolio/',
  '/Sahil-Portfolio/index.html',
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
  // Remove any existing base path to avoid duplication
  const cleanPath = path.startsWith(BASE_PATH) ? path.substring(BASE_PATH.length) : path;
  return `${BASE_PATH}${cleanPath}`;
}

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
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

// Helper function to fetch and cache responses
async function fetchAndCache(request) {
  try {
    const response = await fetch(request);
    
    // Only cache GET requests and successful responses
    if (request.method === 'GET' && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, response.clone());
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
  const isSameOrigin = requestUrl.origin === self.location.origin;
  
  // Handle navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Always try network first for navigation requests
          const networkResponse = await fetch(event.request);
          if (networkResponse && networkResponse.status === 200) {
            return networkResponse;
          }
        } catch (error) {
          console.log('Network request failed, falling back to cache');
        }
        
        // If network fails, try to serve from cache
        const cachedResponse = await caches.match(
          new URL(getPathWithBase('/index.html'), self.location.origin)
        );
        
        return cachedResponse || caches.match(new URL(OFFLINE_PAGE, self.location.origin));
      })()
    );
    return;
  }

  // For non-navigation requests, try cache first, then network
  event.respondWith(
    (async () => {
      // Try to get from cache first
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      // For same-origin requests, ensure we're using the correct base path
      if (isSameOrigin) {
        const pathWithBase = getPathWithBase(requestUrl.pathname);
        if (pathWithBase !== requestUrl.pathname) {
          const modifiedRequest = new Request(
            new URL(pathWithBase + requestUrl.search, self.location.origin).toString(),
            event.request
          );
          const cachedResponseWithBase = await caches.match(modifiedRequest);
          if (cachedResponseWithBase) {
            return cachedResponseWithBase;
          }
        }
      }

      // If not in cache, try network
      try {
        return await fetchAndCache(event.request);
      } catch (error) {
        // For HTML requests, return the offline page
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match(new URL(OFFLINE_PAGE, self.location.origin));
        }
        // For other requests, return a generic offline response
        return new Response('You are offline. Please check your internet connection.', {
          status: 503,
          statusText: 'Offline',
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    })()
  );
});
