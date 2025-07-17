// Service Worker for Portfolio PWA
const CACHE_NAME = 'portfolio-cache-v15';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/about',
  '/manifest.json',
  // Favicons
  '/favicon.ico',
  '/favicons/android-chrome-192x192.png',
  '/favicons/android-chrome-512x512.png',
  '/favicons/apple-touch-icon.png',
  '/favicons/favicon-16x16.png',
  '/favicons/favicon-32x32.png',
  '/favicons/favicon.svg',
  // Logo images
  '/images/logo/logo192.png',
  '/images/logo/logo192.webp',
  '/images/logo/logo512.png',
  '/images/logo/logo512.webp',
  '/images/logo/logo512-300w.webp',
  // Other assets
  '/images/og-default.jpg',
  '/fonts/Roboto.woff2',
  '/fonts/Poppins.woff2',
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
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
