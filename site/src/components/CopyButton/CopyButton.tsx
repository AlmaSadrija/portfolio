import { useEffect, useState } from 'react';
import { Icon } from '../Icon/Icon.tsx';
import styles from './CopyButton.module.css';

interface CopyButtonProps {
  value: string;
  label: string;
  /** Announced to screen readers after copying. */
  confirmation: string;
}

export function CopyButton({ value, label, confirmation }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Clipboard access can be blocked; the visible value can still be selected manually.
    }
  }

  return (
    <>
      <button type="button" className={styles.button} onClick={copy} data-copied={copied || undefined}>
        <Icon name={copied ? 'check' : 'copy'} size={16} />
        <span>{copied ? 'Copied' : label}</span>
      </button>
      <output className="visually-hidden">{copied ? confirmation : ''}</output>
    </>
  );
}
