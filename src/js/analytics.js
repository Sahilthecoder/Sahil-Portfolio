// src/js/analytics.js

// Example: Google Analytics gtag.js snippet (replace with your tracking ID)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'YOUR-GA-TRACKING-ID');

// Custom event tracking example
export function trackEvent(category, action, label = '') {
  if (typeof gtag === 'function') {
    gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
}
