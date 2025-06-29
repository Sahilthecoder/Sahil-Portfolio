import React from 'react';
import ReactDOM from 'react-dom/client';
import InstallPrompt from './components/InstallPrompt';

let deferredPrompt;
const INSTALL_PROMPT_SHOWN = 'installPromptShown';

// ✅ Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const base = '/Sahil-Portfolio';
    const swUrl = `${base}/service-worker.js`;
    
    navigator.serviceWorker.register(swUrl, { scope: base })
      .then(registration => {
        console.log('✅ ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(err => {
        console.error('❌ ServiceWorker registration failed:', err);
      });
  });

  // Create InstallPrompt container
  const installPromptElement = document.createElement('div');
  installPromptElement.id = 'install-prompt-container';
  document.body.appendChild(installPromptElement);

  // Create React root
  const installPromptRoot = ReactDOM.createRoot(installPromptElement);

  // Function to show the install prompt
  const showInstallPrompt = () => {
    installPromptRoot.render(
      <React.StrictMode>
        <InstallPrompt
          onInstall={() => deferredPrompt?.prompt()}
          onClose={() => {
            installPromptElement.style.display = 'none';
            deferredPrompt = null;
          }}
        />
      </React.StrictMode>
    );
  };
}

// ✅ Handle install button click
function handleInstallButton(installButton) {
  if (!installButton || installButton.getAttribute('data-installed')) return;

  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`📦 User response: ${outcome}`);

      deferredPrompt = null;
      installButton.style.display = 'none';
    } catch (err) {
      console.error('❌ Error during install prompt:', err);
    }
  });

  installButton.setAttribute('data-installed', 'true');
}

// Move install prompt to corner with animation
function moveToCorner() {
  const installScreen = document.getElementById('install-screen');
  if (!installScreen) return;
  
  // Add transition class for smooth animation
  installScreen.classList.add('move-to-corner');
  
  // After animation completes, update styles
  setTimeout(() => {
    installScreen.style.background = 'transparent';
    const dialog = installScreen.firstElementChild;
    if (dialog) {
      dialog.style.transform = 'scale(0.8)';
      dialog.style.transformOrigin = 'bottom left';
      dialog.style.margin = '0';
      dialog.style.maxWidth = '300px';
      dialog.classList.add('shadow-lg');
    }
  }, 300); // Match this with CSS transition duration
}

// Handle close button click
function handleCloseButton(closeButton) {
  if (!closeButton || closeButton.getAttribute('data-closed')) return;

  closeButton.addEventListener('click', () => {
    const installScreen = document.getElementById('install-screen');
    if (installScreen) {
      moveToCorner();
    }
  });

  closeButton.setAttribute('data-closed', 'true');
}

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
  // Only show install prompt on home page
  if (window.location.pathname !== '/') return;

  // Check if we've shown the prompt before
  const hasShownPrompt = localStorage.getItem(INSTALL_PROMPT_SHOWN);
  
  e.preventDefault();
  deferredPrompt = e;
  console.log('beforeinstallprompt event captured');

  // Only show install prompt on home page
  if (window.location.pathname !== '/') return;

  // Prevent default behavior and store the event
  e.preventDefault();
  deferredPrompt = e;
  console.log('beforeinstallprompt event captured');

  // Show the install prompt
  installPromptElement.style.display = 'block';
  showInstallPrompt();
}, { once: true });

// ✅ App successfully installed
window.addEventListener('appinstalled', () => {
  console.log('✅ App successfully installed!');
  deferredPrompt = null;

  const installButton = document.getElementById('install-button');
  if (installButton) {
    installButton.style.display = 'none';
  }

  const installScreen = document.getElementById('install-screen');
  if (installScreen) {
    installScreen.style.display = 'none';
  }
});
