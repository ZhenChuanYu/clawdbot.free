/**
 * Performance optimization utilities
 * Helps avoid long tasks and improve main thread performance
 */

/**
 * Execute a function during idle time to avoid blocking the main thread
 */
export function runOnIdle(callback: () => void, timeout = 5000): void {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, { timeout });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(callback, 0);
  }
}

/**
 * Split a long-running task into smaller chunks
 */
export function chunkTask<T>(
  items: T[],
  processItem: (item: T) => void,
  chunkSize = 10,
  onComplete?: () => void
): void {
  let index = 0;

  function processChunk() {
    const end = Math.min(index + chunkSize, items.length);
    
    for (let i = index; i < end; i++) {
      processItem(items[i]);
    }
    
    index = end;
    
    if (index < items.length) {
      runOnIdle(processChunk);
    } else if (onComplete) {
      onComplete();
    }
  }
  
  processChunk();
}

/**
 * Defer non-critical initialization
 */
export function deferInit(callback: () => void, delay = 100): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(callback, delay);
    });
  } else {
    setTimeout(callback, delay);
  }
}

/**
 * Preload resources when idle
 */
export function preloadResource(href: string, as: string): void {
  runOnIdle(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  });
}

