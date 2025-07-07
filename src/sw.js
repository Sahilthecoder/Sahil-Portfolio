// Service Worker for Portfolio PWA
const CACHE_NAME = 'portfolio-cache-v13';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './about',
  './manifest.json',
  './images/logo192.png',
  './images/logo512.png',
  './favicon.ico',
  './images/favicon-16x16.png',
  './images/favicon-32x32.png',
  './images/og-default.jpg',
  './fonts/Roboto.woff2',
  './fonts/Poppins.woff2',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
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
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache, falling back to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
