import { useState, useEffect } from 'react';

type ServiceWorkerState = 'installing' | 'installed' | 'updated' | 'error' | null;

const useServiceWorker = (): [ServiceWorkerState, () => void] => {
  const [state, setState] = useState<ServiceWorkerState>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // Register service worker
      const registerServiceWorker = async () => {
        try {
          const basePath = import.meta.env.BASE_URL || '/';
          const swPath = `${basePath}sw.js`.replace(/\/\//g, '/');
          const registration = await navigator.serviceWorker.register(swPath);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            
            if (!newWorker) return;
            
            setState('installing');
            
            newWorker.addEventListener('statechange', () => {
              switch (newWorker.state) {
                case 'installed':
                  if (navigator.serviceWorker.controller) {
                    // New content is available
                    setState('updated');
                  } else {
                    // Content is now available offline
                    setState('installed');
                  }
                  break;
                case 'redundant':
                  setState('error');
                  break;
                default:
                  break;
              }
            });
          });

          // Check for updates every hour
          const updateInterval = setInterval(() => {
            registration.update().catch(console.error);
          }, 60 * 60 * 1000);

          // Listen for controller change (page refresh after update)
          navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
          });

          return () => clearInterval(updateInterval);
        } catch (error) {
          console.error('Service worker registration failed:', error);
          setState('error');
        }
      };

      // Check if the browser supports service workers
      if ('serviceWorker' in navigator && import.meta.env.PROD) {
        window.addEventListener('load', registerServiceWorker);
      }

      return () => {
        window.removeEventListener('load', registerServiceWorker);
      };
    }
  }, []);

  // Function to skip waiting and activate the new service worker
  const skipWaiting = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
  };

  return [state, skipWaiting];
};

export default useServiceWorker;
