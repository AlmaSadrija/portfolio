/** Subscribes to scroll and resize, for hooks built on useSyncExternalStore. */
export function subscribeToViewport(callback: () => void): () => void {
  window.addEventListener('scroll', callback, { passive: true });
  window.addEventListener('resize', callback);
  return () => {
    window.removeEventListener('scroll', callback);
    window.removeEventListener('resize', callback);
  };
}
