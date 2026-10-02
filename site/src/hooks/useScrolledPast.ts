import { useSyncExternalStore } from 'react';
import { subscribeToViewport } from './viewport.ts';

/** True once the page has scrolled more than `threshold` pixels. */
export function useScrolledPast(threshold: number): boolean {
  return useSyncExternalStore(
    subscribeToViewport,
    () => window.scrollY > threshold,
    () => false,
  );
}
