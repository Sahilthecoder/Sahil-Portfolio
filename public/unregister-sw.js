// Unregister all service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (const registration of registrations) {
      registration.unregister();
      console.log('ServiceWorker unregistered:', registration.scope);
    }
  });
  
  // Clear all caches
  caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        return caches.delete(cacheName);
      })
    );
  }).then(function() {
    console.log('All caches cleared');
  });
  
  // Force reload the page
  window.location.reload(true);
}
