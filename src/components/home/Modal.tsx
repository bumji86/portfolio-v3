'use client';
import { useEffect, useRef } from 'react';

// Shared <dialog> shell: 20px radius, close button, backdrop click, scroll lock.
// showModal() gives the top layer, Escape-to-close and focus containment for free.
export default function Modal({
  open,
  onClose,
  labelledBy,
  closeLabel = 'Close',
  className = 'max-w-[960px]',
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  closeLabel?: string;
  className?: string; // width constraints
  children: React.ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = prev;
    };
  }, [open]);

  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      // a click that lands on the <dialog> itself (not its content) is a backdrop click
      onClick={(e) => e.target === e.currentTarget && close()}
      aria-labelledby={labelledBy}
      className={`m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] overflow-hidden rounded-[20px] bg-white p-0 text-neutral-900 shadow-2xl backdrop:bg-black/50 open:animate-modal-in motion-reduce:open:animate-none dark:bg-neutral-900 dark:text-neutral-100 ${className}`}
    >
      {open && (
        <>
          <button
            type="button"
            onClick={close}
            aria-label={closeLabel}
            className="absolute top-4 right-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm backdrop-blur transition-colors hover:bg-neutral-100 md:top-5 md:right-5 dark:bg-neutral-800/90 dark:text-neutral-200 dark:hover:bg-neutral-700"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain">{children}</div>
        </>
      )}
    </dialog>
  );
}
