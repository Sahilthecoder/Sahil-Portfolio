import { useEffect, useState } from 'react';

type MetricType = 'CLS' | 'FCP' | 'FID' | 'LCP' | 'TTFB' | 'INP';
type MetricRating = 'good' | 'needs-improvement' | 'poor';

// Define the PerformanceEntryLargestContentfulPaint interface
interface PerformanceEntryLargestContentfulPaint extends PerformanceEntry {
  renderTime?: number;
  loadTime?: number;
  size: number;
  id: string;
  url: string;
  element?: Element;
}

// Define the LayoutShift interface based on the LayoutShift API
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
  lastInputTime: number;
  sources: Array<{
    node: Node;
    previousRect: DOMRectReadOnly;
    currentRect: DOMRectReadOnly;
  }>;
}

interface Metric {
  name: string;
  value: number;
  rating: MetricRating;
  entries: PerformanceEntry[];
  delta: number;
  id: string;
  navigationType?: NavigationType;
}

interface WebVitals {
  CLS: Metric | null;
  FCP: Metric | null;
  FID: Metric | null;
  LCP: Metric | null;
  TTFB: Metric | null;
  INP: Metric | null;
  isSupported: boolean;
  getMetric: (name: MetricType) => Metric | null;
}

const usePerformanceMetrics = (): WebVitals => {
  const [metrics, setMetrics] = useState<{
    CLS: Metric | null;
    FCP: Metric | null;
    FID: Metric | null;
    LCP: Metric | null;
    TTFB: Metric | null;
    INP: Metric | null;
  }>({
    CLS: null,
    FCP: null,
    FID: null,
    LCP: null,
    TTFB: null,
    INP: null,
  });

  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    // Check if the browser supports the Performance API
    if (!('performance' in window) || !('PerformanceObserver' in window)) {
      console.warn('Performance API not supported');
      return;
    }

    setIsSupported(true);

    // Track First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntriesByName('first-contentful-paint');
      const fcp = entries[entries.length - 1];
      
      if (fcp) {
        const value = Math.round(fcp.startTime);
        const metric: Metric = {
          name: 'FCP',
          value,
          rating: getRating('FCP', value),
          entries: [fcp],
          delta: 0, // Not used in this context
          id: `fcp-${Date.now()}`,
        };
        
        setMetrics((prev) => ({
          ...prev,
          FCP: metric,
        }));
        
        // Log to analytics
        logMetric('FCP', value);
      }
    });

    // Track Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries() as PerformanceEntryLargestContentfulPaint[];
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        const lcpEntry = lastEntry as unknown as { renderTime?: number, loadTime?: number };
        const value = Math.round(lcpEntry.renderTime || lcpEntry.loadTime || 0);
        const metric: Metric = {
          name: 'LCP',
          value,
          rating: getRating('LCP', value),
          entries: [lastEntry],
          delta: 0, // Not used in this context
          id: `lcp-${Date.now()}`,
        };
        
        setMetrics((prev) => ({
          ...prev,
          LCP: metric,
        }));
        
        // Log to analytics
        logMetric('LCP', value);
      }
    });

    // Track First Input Delay (FID)
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries() as PerformanceEventTiming[];
      
      for (const entry of entries) {
        if (entry.entryType === 'first-input') {
          const value = Math.round(entry.processingStart - entry.startTime);
          const metric: Metric = {
            name: 'FID',
            value,
            rating: getRating('FID', value),
            entries: [entry],
            delta: 0, // Not used in this context
            id: `fid-${Date.now()}`,
          };
          
          setMetrics((prev) => ({
            ...prev,
            FID: metric,
          }));
          
          // Log to analytics
          logMetric('FID', value);
          break;
        }
      }
    });

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    let clsEntries: LayoutShift[] = [];
    let sessionValue = 0;
    let sessionEntries: LayoutShift[] = [];
    
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        // Type assertion for LayoutShift
        const layoutShift = entry as unknown as LayoutShift;
        
        // Only count layout shifts without recent user input
        if (!layoutShift.hadRecentInput) {
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
          
          // If this is the first entry or the entry occurred more than 1 second after the last entry,
          // create a new session.
          if (
            sessionEntries.length === 0 ||
            (lastSessionEntry && layoutShift.startTime - lastSessionEntry.startTime > 1000)
          ) {
            sessionValue = 0;
            sessionEntries = [layoutShift];
          } else {
            sessionValue += layoutShift.value;
            sessionEntries.push(layoutShift);
          }
          
          // If the current session value is larger than the current CLS value,
          // update CLS and the entries contributing to it.
          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            clsEntries = [...sessionEntries];
            
            const metric: Metric = {
              name: 'CLS',
              value: Math.round(clsValue * 1000) / 1000,
              rating: getRating('CLS', clsValue),
              entries: clsEntries.map(ls => ({
                ...ls,
                toJSON: () => ({
                  ...ls,
                  // Convert any non-serializable values
                  sources: ls.sources?.map(s => ({
                    node: s.node?.nodeName || '',
                    previousRect: s.previousRect ? {
                      x: s.previousRect.x,
                      y: s.previousRect.y,
                      width: s.previousRect.width,
                      height: s.previousRect.height,
                      top: s.previousRect.top,
                      right: s.previousRect.right,
                      bottom: s.previousRect.bottom,
                      left: s.previousRect.left,
                      toJSON: () => ({}),
                    } : null,
                    currentRect: s.currentRect ? {
                      x: s.currentRect.x,
                      y: s.currentRect.y,
                      width: s.currentRect.width,
                      height: s.currentRect.height,
                      top: s.currentRect.top,
                      right: s.currentRect.right,
                      bottom: s.currentRect.bottom,
                      left: s.currentRect.left,
                      toJSON: () => ({}),
                    } : null,
                  })),
                }),
              })) as unknown as PerformanceEntry[],
              delta: 0, // Not used in this context
              id: `cls-${Date.now()}`,
            };
            
            setMetrics((prev) => ({
              ...prev,
              CLS: metric,
            }));
            
            // Log to analytics
            logMetric('CLS', clsValue);
          }
        }
      }
    });

    // Track Time to First Byte (TTFB)
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      const navigationEntry = navigationEntries[0] as PerformanceNavigationTiming;
      const value = Math.round(navigationEntry.responseStart - navigationEntry.startTime);
      const metric: Metric = {
        name: 'TTFB',
        value,
        rating: getRating('TTFB', value),
        entries: [navigationEntry],
        delta: 0, // Not used in this context
        id: `ttfb-${Date.now()}`,
      };
      
      setMetrics((prev) => ({
        ...prev,
        TTFB: metric,
      }));
      
      // Log to analytics
      logMetric('TTFB', value);
    }

    // Start observing
    fcpObserver.observe({ type: 'paint', buffered: true });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    fidObserver.observe({ type: 'first-input', buffered: true });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // Cleanup
    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  // Helper function to get rating for a metric
  const getRating = (metric: MetricType, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const thresholds: Record<MetricType, { good: number; needsImprovement: number }> = {
      CLS: { good: 0.1, needsImprovement: 0.25 },
      FCP: { good: 1800, needsImprovement: 3000 },
      FID: { good: 100, needsImprovement: 300 },
      LCP: { good: 2500, needsImprovement: 4000 },
      TTFB: { good: 600, needsImprovement: 1800 },
      INP: { good: 200, needsImprovement: 500 },
    };

    if (value <= thresholds[metric].good) return 'good';
    if (value <= thresholds[metric].needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  // Helper function to log metrics to analytics
  const logMetric = (metricName: string, value: number) => {
    // Replace with your analytics implementation
    console.log(`[Performance] ${metricName}:`, value);
    
    // Example: Send to analytics service
    // analytics.track('performance_metric', {
    //   name: metricName,
    //   value,
    //   rating: getRating(metricName as MetricType, value),
    //   timestamp: Date.now(),
    //   path: window.location.pathname,
    // });
  };

  // Get a specific metric by name
  const getMetric = (name: MetricType) => {
    return metrics[name] || null;
  };

  return {
    ...metrics,
    isSupported,
    getMetric,
  };
};

export default usePerformanceMetrics;
