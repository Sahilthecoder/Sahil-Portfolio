// Register service worker in production only
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    const basePath = '/Sahil-Portfolio';
    const swPath = `${basePath}/sw.js`;
    
    navigator.serviceWorker.register(swPath, { scope: basePath })
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.error('ServiceWorker registration failed: ', error);
      });
  });
}
