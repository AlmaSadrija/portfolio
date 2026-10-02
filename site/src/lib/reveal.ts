import type { CSSProperties } from 'react';

let observer: IntersectionObserver | undefined;

function getObserver(): IntersectionObserver {
  observer ??= new IntersectionObserver(
    (entries, self) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.reveal = 'visible';
        self.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  return observer;
}

/**
 * Ref callback that fades an element in as it scrolls into view.
 *
 * The pre-rendered HTML is fully visible; only elements that start below the
 * fold are hidden after load. Reduced-motion users see everything immediately.
 */
export function reveal(element: HTMLElement | null): (() => void) | undefined {
  if (!element || typeof IntersectionObserver === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (element.getBoundingClientRect().top < window.innerHeight) return;

  element.dataset.reveal = 'hidden';
  const io = getObserver();
  io.observe(element);
  return () => io.unobserve(element);
}

/** Staggers reveal animations within a list. */
export function revealDelay(index: number, stepMs = 70): CSSProperties {
  return { '--reveal-delay': `${index * stepMs}ms` } as CSSProperties;
}
