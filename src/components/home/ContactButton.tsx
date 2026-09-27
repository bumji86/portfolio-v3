'use client';
import { useModal } from './modal-context';

// Opens the contact modal; used where a server component needs a Contact trigger.
export default function ContactButton({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const { openContact } = useModal();
  return (
    <button type="button" onClick={openContact} aria-haspopup="dialog" className={`cursor-pointer ${className}`}>
      {children}
    </button>
  );
}
