import React, { ComponentType, Suspense, lazy, ReactNode } from 'react';
import { ErrorBoundary } from '../components/error/ErrorBoundary';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

/**
 * Higher-order component for lazy loading components with Suspense and ErrorBoundary
 * @param importFn - Function that returns a dynamic import()
 * @param fallback - Optional fallback component (defaults to LoadingSpinner)
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback: ReactNode = <LoadingSpinner />
) {
  const LazyComponent = lazy(importFn);
  
  return function LazyWrapper(props: React.ComponentProps<T>) {
    return (
      <ErrorBoundary>
        <Suspense fallback={fallback}>
          <LazyComponent {...props} />
        </Suspense>
      </ErrorBoundary>
    );
  };
}

/**
 * Preload a component for better performance
 * @param importFn - Function that returns a dynamic import()
 * @returns A function to trigger the preload
 */
export function preloadComponent<T>(
  importFn: () => Promise<{ default: T }>
): () => Promise<{ default: T }> {
  let loaded: { default: T } | null = null;
  let loadingPromise: Promise<{ default: T }> | null = null;
  
  return () => {
    if (loaded) {
      return Promise.resolve(loaded);
    }
    
    if (!loadingPromise) {
      loadingPromise = importFn().then(module => {
        loaded = module;
        return module;
      });
    }
    
    return loadingPromise;
  };
}

/**
 * Prefetch a route's resources
 * @param path - The route path to prefetch
 */
export function prefetchRoute(path: string): void {
  // This function will be enhanced with route-specific prefetching logic
  // For now, it's a placeholder for future implementation
  console.log(`Prefetching resources for route: ${path}`);
  
  // Example: Prefetch data for the route
  // prefetchDataForRoute(path);
  
  // Example: Prefetch images for the route
  // prefetchImagesForRoute(path);
}

/**
 * Hook to prefetch resources when the user hovers over a link
 */
export function usePrefetchOnHover(href: string) {
  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(
        () => {
          prefetchRoute(href);
        },
        { timeout: 500 }
      );
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      const timeoutId = setTimeout(() => {
        prefetchRoute(href);
      }, 200);
      
      return () => clearTimeout(timeoutId);
    }
  };
  
  return { onMouseEnter: handleMouseEnter, onTouchStart: handleMouseEnter };
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  if (typeof document === 'undefined') return;
  
  // Preload critical fonts
  const fontLinks = [
    { href: '/fonts/yourfont-regular.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    { href: '/fonts/yourfont-bold.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
  ];
  
  fontLinks.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = font.href;
    link.as = font.as;
    link.type = font.type;
    link.setAttribute('crossorigin', font.crossorigin);
    document.head.appendChild(link);
  });
  
  // Preload critical images
  const imageUrls = [
    '/images/og-default.jpg',
    // Add other critical image paths here
  ];
  
  imageUrls.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });
}

/**
 * Prefetch routes that are likely to be visited next
 */
export function prefetchLikelyRoutes() {
  if (typeof window === 'undefined') return;
  
  // Prefetch routes based on user behavior
  const likelyRoutes = [
    '/about',
    '/projects',
    '/contact',
    // Add other likely routes here
  ];
  
  // Use requestIdleCallback to avoid blocking the main thread
  if ('requestIdleCallback' in window) {
    requestIdleCallback(
      () => {
        likelyRoutes.forEach(route => prefetchRoute(route));
      },
      { timeout: 1000 }
    );
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(() => {
      likelyRoutes.forEach(route => prefetchRoute(route));
    }, 1000);
  }
}

// Initialize preloading when the module is loaded
if (typeof window !== 'undefined') {
  // Preload critical resources as soon as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalResources);
  } else {
    preloadCriticalResources();
  }
  
  // Prefetch likely routes when the browser is idle
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(prefetchLikelyRoutes, { timeout: 2000 });
  } else {
    setTimeout(prefetchLikelyRoutes, 2000);
  }
}
