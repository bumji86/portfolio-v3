'use client';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import { ProjectBody, type Project } from './ProjectModal';
import ContactPanel from './ContactPanel';
import DownloadPdfLink from '@/components/resume/DownloadPdfLink';
import { ModalContext } from './modal-context';
import type { ContactInfo } from '@/content/contact';

type Active = { type: 'project'; project: Project } | { type: 'contact' } | { type: 'resume' } | null;

// One modal for the whole home page: project details or the contact form.
// `#contact` in the URL opens the contact modal (on load or hash change), so it can be shared as a link.
// `contact` is null on the blind page: the contact modal is disabled there.
// `resume` is the server-rendered résumé (no contact details), shown by openResume().
export function ModalProvider({
  children,
  contact,
  resume,
}: {
  children: React.ReactNode;
  contact: ContactInfo | null;
  resume?: React.ReactNode;
}) {
  const allowContact = contact !== null;
  const [active, setActive] = useState<Active>(null);

  useEffect(() => {
    if (!allowContact) return;
    const check = () => window.location.hash === '#contact' && setActive({ type: 'contact' });
    const id = setTimeout(check, 0); // on load
    window.addEventListener('hashchange', check); // e.g. the URL edited in place
    return () => {
      clearTimeout(id);
      window.removeEventListener('hashchange', check);
    };
  }, [allowContact]);

  const onClose = () => {
    setActive(null);
    if (window.location.hash === '#contact') history.replaceState(null, '', window.location.pathname + window.location.search);
  };

  return (
    <ModalContext
      value={{
        openProject: (project) => setActive({ type: 'project', project }),
        openContact: () => allowContact && setActive({ type: 'contact' }),
        openResume: () => resume && setActive({ type: 'resume' }),
      }}
    >
      {children}
      <Modal
        open={active !== null}
        onClose={onClose}
        labelledBy={active?.type === 'contact' ? 'contact-modal-title' : active?.type === 'resume' ? 'resume-title' : 'project-modal-title'}
        className={active?.type === 'contact' ? 'max-w-[1120px]' : 'max-w-[960px]'}
      >
        {active?.type === 'project' && <ProjectBody project={active.project} />}
        {active?.type === 'contact' && contact && <ContactPanel contact={contact} />}
        {active?.type === 'resume' && (
          <>
            {/* right padding keeps the button clear of the modal's close button */}
            <div className="flex justify-start px-6 pt-5 pr-16 md:px-12 md:pt-6">
              <DownloadPdfLink />
            </div>
            {resume}
          </>
        )}
      </Modal>
    </ModalContext>
  );
}
