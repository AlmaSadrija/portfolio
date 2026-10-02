import { useEffect, useId, useRef } from 'react';
import type { Image } from '../../content/types.ts';
import { Icon } from '../Icon/Icon.tsx';
import styles from './ScreenshotDialog.module.css';

interface ScreenshotDialogProps {
  /** The screenshot to show; null keeps the dialog closed. */
  screenshot: { title: string; image: Image } | null;
  onClose: () => void;
}

/**
 * Full-size screenshot viewer built on the native <dialog>, which provides
 * focus trapping, Escape to close and focus restoration.
 */
export function ScreenshotDialog({ screenshot, onClose }: ScreenshotDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (screenshot && !dialog.open) dialog.showModal();
    if (!screenshot && dialog.open) dialog.close();
  }, [screenshot]);

  const close = () => dialogRef.current?.close();

  return (
    // Keyboard users close the dialog with Escape (native) or the close button;
    // the click handler only adds closing by clicking the backdrop.
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      onClose={onClose}
      // A click on the dialog element itself (not its content) is a click on the backdrop.
      onClick={(event) => event.target === event.currentTarget && close()}
    >
      {screenshot && (
        <div className={styles.content}>
          <div className={styles.bar}>
            <h2 id={titleId} className={styles.title}>
              {screenshot.title}
              <span className={styles.subtitle}> · screenshot</span>
            </h2>
            <button type="button" className={styles.close} onClick={close} aria-label="Close screenshot">
              <Icon name="close" size={20} />
            </button>
          </div>
          <img
            className={styles.image}
            src={screenshot.image.src}
            width={screenshot.image.width}
            height={screenshot.image.height}
            alt={screenshot.image.alt}
          />
        </div>
      )}
    </dialog>
  );
}
