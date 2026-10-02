import type { AnchorHTMLAttributes } from 'react';

/** Link to another site; opens in a new tab and tells screen-reader users so. */
export function ExternalLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
