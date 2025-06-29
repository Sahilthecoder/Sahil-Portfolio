/**
 * Performance monitoring and metrics utilities
 * 
 * This module provides functions to measure and report web performance metrics,
 * including Core Web Vitals and custom metrics.
 */

// Performance metrics storage
const metrics = {
  // Core Web Vitals
  CLS: { value: 0, entries: [] },
  FID: { value: 0, entries: [] },
  LCP: { value: 0, entries: [] },
  FCP: { value: 0, entries: [] },
  INP: { value: 0, entries: [] },
  
  // Custom metrics
  TTFB: 0,           // Time to First Byte
  FMP: 0,            // First Meaningful Paint
  TTI: 0,            // Time to Interactive
  TBT: 0,            // Total Blocking Time
  SI: 0,             // Speed Index
  CLS_FINAL: 0,      // Final CLS (after page load)
  
  // Resource timing
  resourceTimings: [],
  
  // Navigation timing
  navigationTiming: null,
};

// Flag to track if PerformanceObserver is supported
const isPerformanceObserverSupported = 
  typeof window !== 'undefined' && 
  'PerformanceObserver' in window;

// Flag to track if Performance API is supported
const isPerformanceSupported = 
  typeof window !== 'undefined' && 
  'performance' in window;

/**
 * Initializes performance monitoring
 */
export function initPerformanceMonitoring() {
  if (!isPerformanceObserverSupported || !isPerformanceSupported) {
    console.warn('Performance monitoring is not supported in this browser');
    return;
  }

  // Observe Core Web Vitals
  observeCLS();
  observeFID();
  observeLCP();
  observeFCP();
  observeINP();
  
  // Capture navigation timing
  captureNavigationTiming();
  
  // Capture resource timing
  captureResourceTiming();
  
  // Capture final metrics when page is about to unload
  if ('onbeforeunload' in window) {
    window.addEventListener('beforeunload', () => {
      // Capture final CLS value
      if (metrics.CLS.entries.length > 0) {
        metrics.CLS_FINAL = Math.max(
          ...metrics.CLS.entries.map(entry => entry.value)
        );
      }
      
      // Log final metrics
      logMetrics();
    });
  }
  
  // Log metrics when page is fully loaded
  if (document.readyState === 'complete') {
    logMetrics();
  } else {
    window.addEventListener('load', logMetrics);
  }
}

/**
 * Observes Cumulative Layout Shift (CLS)
 */
function observeCLS() {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Only count layout shifts without recent user input
        if (!entry.hadRecentInput) {
          metrics.CLS.value += entry.value;
          metrics.CLS.entries.push(entry);
        }
      }
    });
    
    observer.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.error('Error observing CLS:', e);
  }
}

/**
 * Observes First Input Delay (FID)
 */
function observeFID() {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        metrics.FID.value = entry.processingStart - entry.startTime;
        metrics.FID.entries.push(entry);
      }
    });
    
    observer.observe({ type: 'first-input', buffered: true });
  } catch (e) {
    console.error('Error observing FID:', e);
  }
}

/**
 * Observes Largest Contentful Paint (LCP)
 */
function observeLCP() {
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.LCP.value = lastEntry.startTime;
      metrics.LCP.entries.push(lastEntry);
    });
    
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.error('Error observing LCP:', e);
  }
}

/**
 * Observes First Contentful Paint (FCP)
 */
function observeFCP() {
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntriesByName('first-contentful-paint');
      if (entries.length > 0) {
        metrics.FCP.value = entries[0].startTime;
        metrics.FCP.entries = entries;
      }
    });
    
    observer.observe({ type: 'paint', buffered: true });
  } catch (e) {
    console.error('Error observing FCP:', e);
  }
}

/**
 * Observes Interaction to Next Paint (INP)
 */
function observeINP() {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        metrics.INP.value = entry.duration;
        metrics.INP.entries.push(entry);
      }
    });
    
    observer.observe({ type: 'event', durationThreshold: 0 });
  } catch (e) {
    console.error('Error observing INP:', e);
  }
}

/**
 * Captures navigation timing metrics
 */
function captureNavigationTiming() {
  if (!isPerformanceSupported) return;
  
  try {
    const navigationTiming = performance.getEntriesByType('navigation')[0];
    if (navigationTiming) {
      metrics.navigationTiming = navigationTiming;
      
      // Calculate TTFB (Time to First Byte)
      metrics.TTFB = navigationTiming.responseStart - navigationTiming.startTime;
      
      // Calculate TTI (Time to Interactive)
      if (navigationTiming.domInteractive && navigationTiming.domContentLoadedEventStart) {
        metrics.TTI = navigationTiming.domInteractive - navigationTiming.startTime;
      }
      
      // Calculate FMP (First Meaningful Paint) - approximation
      if (navigationTiming.domContentLoadedEventStart) {
        metrics.FMP = navigationTiming.domContentLoadedEventStart - navigationTiming.startTime;
      }
    }
  } catch (e) {
    console.error('Error capturing navigation timing:', e);
  }
}

/**
 * Captures resource timing metrics
 */
function captureResourceTiming() {
  if (!isPerformanceSupported) return;
  
  try {
    metrics.resourceTimings = performance.getEntriesByType('resource');
  } catch (e) {
    console.error('Error capturing resource timing:', e);
  }
}

/**
 * Measures time taken by a function
 * @param {Function} fn - The function to measure
 * @param {string} name - Name for the measurement
 * @returns {*} - The result of the function
 */
export function measure(fn, name = 'measure') {
  if (!isPerformanceSupported) {
    return fn();
  }
  
  const startMark = `${name}-start`;
  const endMark = `${name}-end`;
  
  performance.mark(startMark);
  const result = fn();
  performance.mark(endMark);
  
  performance.measure(name, startMark, endMark);
  
  // Clean up marks
  performance.clearMarks(startMark);
  performance.clearMarks(endMark);
  
  return result;
}

/**
 * Logs performance metrics to the console
 */
function logMetrics() {
  if (process.env.NODE_ENV === 'production') {
    // In production, you might want to send these metrics to an analytics service
    // Example: sendMetricsToAnalytics(metrics);
    return;
  }
  
  // Log metrics in development
  console.group('Performance Metrics');
  
  // Core Web Vitals
  console.group('Core Web Vitals');
  console.log('CLS:', metrics.CLS.value.toFixed(4));
  console.log('FID:', metrics.FID.value, 'ms');
  console.log('LCP:', metrics.LCP.value, 'ms');
  console.log('FCP:', metrics.FCP.value, 'ms');
  console.log('INP:', metrics.INP.value, 'ms');
  console.groupEnd();
  
  // Navigation Timing
  if (metrics.navigationTiming) {
    console.group('Navigation Timing');
    console.log('TTFB:', metrics.TTFB, 'ms');
    console.log('FMP:', metrics.FMP, 'ms');
    console.log('TTI:', metrics.TTI, 'ms');
    // Calculate TBT (Total Blocking Time) - sum of all blocking time between FCP and TTI
    if (metrics.TTI > 0 && metrics.FCP > 0) {
      metrics.TBT = calculateTBT();
      console.log('TBT:', metrics.TBT, 'ms');
    }
    console.groupEnd();
  }
  
  // Resource Timing
  if (metrics.resourceTimings.length > 0) {
    console.group('Resource Timing');
    metrics.resourceTimings.forEach(resource => {
      console.log(
        `${resource.name}:`,
        `${Math.round(resource.duration)}ms`,
        `(${formatBytes(resource.transferSize)})`
      );
    });
    console.groupEnd();
  }
  
  // User Timing API measurements
  const measures = performance.getEntriesByType('measure');
  if (measures.length > 0) {
    console.group('Custom Measurements');
    measures.forEach(measure => {
      console.log(`${measure.name}: ${Math.round(measure.duration * 100) / 100}ms`);
    });
    console.groupEnd();
  }
  
  console.groupEnd();
}

/**
 * Calculates Total Blocking Time (TBT)
 * @returns {number} - TBT in milliseconds
 */
function calculateTBT() {
  if (!isPerformanceSupported) return 0;
  
  try {
    // Get all long tasks (tasks that took more than 50ms)
    const longTasks = performance.getEntriesByType('longtask') || [];
    let tbt = 0;
    
    // Sum up blocking time (time over 50ms for each long task)
    longTasks.forEach(task => {
      // Only count tasks that happened between FCP and TTI
      if (
        task.startTime >= metrics.FCP.value && 
        (metrics.TTI === 0 || task.startTime + task.duration <= metrics.TTI)
      ) {
        tbt += task.duration - 50; // Subtract 50ms threshold
      }
    });
    
    return Math.max(0, tbt);
  } catch (e) {
    console.error('Error calculating TBT:', e);
    return 0;
  }
}

/**
 * Formats bytes to a human-readable string
 * @param {number} bytes - Size in bytes
 * @returns {string} - Formatted string
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Gets the current performance metrics
 * @returns {Object} - Performance metrics
 */
export function getMetrics() {
  return { ...metrics };
}

// Initialize performance monitoring when the module is loaded
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete') {
    initPerformanceMonitoring();
  } else {
    window.addEventListener('load', initPerformanceMonitoring);
  }
}
