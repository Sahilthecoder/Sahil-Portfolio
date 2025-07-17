// Service Worker for Portfolio PWA
const CACHE_NAME = 'portfolio-cache-v16';
const BASE_PATH = '/Sahil-Portfolio';
const ASSETS_TO_CACHE = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/about`,
  `${BASE_PATH}/manifest.json`,
  // Favicons
  `${BASE_PATH}/favicon.ico`,
  `${BASE_PATH}/favicons/android-chrome-192x192.png`,
  `${BASE_PATH}/favicons/android-chrome-512x512.png`,
  `${BASE_PATH}/favicons/apple-touch-icon.png`,
  `${BASE_PATH}/favicons/favicon-16x16.png`,
  `${BASE_PATH}/favicons/favicon-32x32.png`,
  `${BASE_PATH}/favicons/favicon.svg`,
  // Logo images
  `${BASE_PATH}/images/logo/logo192.png`,
  `${BASE_PATH}/images/logo/logo192.webp`,
  `${BASE_PATH}/images/logo/logo512.png`,
  `${BASE_PATH}/images/logo/logo512.webp`,
  `${BASE_PATH}/images/logo/logo512-300w.webp`,
  // Other assets
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
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
