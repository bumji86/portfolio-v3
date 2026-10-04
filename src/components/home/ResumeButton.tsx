'use client';
import { useModal } from './modal-context';

// Opens the résumé modal; used where a server component needs a Resume trigger.
export default function ResumeButton({ className = '', children }: { className?: string; children: React.ReactNode }) {
  const { openResume } = useModal();
  return (
    <button type="button" onClick={openResume} aria-haspopup="dialog" className={`cursor-pointer ${className}`}>
      {children}
    </button>
  );
}
