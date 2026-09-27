'use client';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import { ProjectBody, type Project } from './ProjectModal';
import ContactPanel from './ContactPanel';
import { ModalContext } from './modal-context';

type Active = { type: 'project'; project: Project } | { type: 'contact' } | null;

// One modal for the whole home page: project details or the contact form.
// `#contact` in the URL opens the contact modal (on load or hash change), so it can be shared as a link.
export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<Active>(null);

  useEffect(() => {
    const check = () => window.location.hash === '#contact' && setActive({ type: 'contact' });
    const id = setTimeout(check, 0); // on load
    window.addEventListener('hashchange', check); // e.g. the URL edited in place
    return () => {
      clearTimeout(id);
      window.removeEventListener('hashchange', check);
    };
  }, []);

  const onClose = () => {
    setActive(null);
    if (window.location.hash === '#contact') history.replaceState(null, '', window.location.pathname + window.location.search);
  };

  return (
    <ModalContext
      value={{
        openProject: (project) => setActive({ type: 'project', project }),
        openContact: () => setActive({ type: 'contact' }),
      }}
    >
      {children}
      <Modal
        open={active !== null}
        onClose={onClose}
        labelledBy={active?.type === 'contact' ? 'contact-modal-title' : 'project-modal-title'}
        className={active?.type === 'contact' ? 'max-w-[1120px]' : 'max-w-[960px]'}
      >
        {active?.type === 'project' && <ProjectBody project={active.project} />}
        {active?.type === 'contact' && <ContactPanel />}
      </Modal>
    </ModalContext>
  );
}
